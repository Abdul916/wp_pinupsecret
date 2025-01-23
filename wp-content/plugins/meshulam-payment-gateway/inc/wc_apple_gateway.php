<?php
defined('ABSPATH') || exit; // Exit if accessed directly

define('MESHULAM_SRC_FILE_APPLE', MESHULAM_PLUGIN_DIR);
define('MESHULAM_DEST_FILE_APPLE', ABSPATH . ".well-known");
define('MESHULAM_APPLE_FILE', 'apple-developer-merchantid-domain-association');

#[\AllowDynamicProperties]
class WC_Apple_Meshulam_Gateway extends WC_Payment_Gateway_CC
{
    public $title,
    $description,
    $auth_code,
    $api_userid,
    $api_test_mode,
    $debug,
    $payment_url,
    $approvePayment_url,
    $getPaymentProcessInfo_url,
    $response_url,
    $thank_you_page,
    $fail_url,
    $order_status;
    public function __construct()
    {
        $this->id = 'apple-payment';
        $this->icon = MESHULAM_PLUGIN_URL . 'assets/images/apple_icon.png';
        $this->has_fields = true;
        $this->method_title = __('Apple', 'meshulam');
        $this->method_description = __('Pay with apple', 'meshulam');
        $this->supports = [
            'products',
        ];

        $apple_popup = $this->get_option('apple_popup_show');
        $this->refund_mode = $this->get_option('refund_mode');
        if ($apple_popup == '') {
            $this->update_option('apple_popup_show', 'yes');
        }
        $meshulam_refund_status = get_option('meshulam_refund_status');
        if ($meshulam_refund_status == '1') {
            if ($this->refund_mode == 'yes') {
                $this->supports = [
                    'products',
                    'refunds',
                ];}
        } else {
            $this->update_option('refund_mode', '');
        }
        $this->refund_mode = $this->get_option('refund_mode');
        $meshulam_j5_status = get_option('meshulam_j5_status');
        if ($meshulam_j5_status != '1') {
            $this->update_option('j5_mode', '');
        }
        $meshulam_force_regular_payment = get_option('meshulam_force_regular_payment');

        if( get_option('meshulam_apple_payment_status') == 1 && $this->get_option('enabled') == ''){
            $this->update_option('enabled', 'yes');
        }

        $this->api_test_mode = $this->get_option('api_test_mode');
        $this->j5_mode = $this->get_option('j5_mode');
        $this->debug = $this->get_option('apple_debug');
        $this->payment_type = $this->get_option('payment_type');
        $this->maxpayment = $this->get_option('maxpayment');
        $this->title = $this->get_option('title');
        $this->update_url = add_query_arg('wc-api', 'apple_server_response', home_url('/'));
        $this->apple_pay_title = $this->get_option('apple_pay_title');
        $this->description = $this->get_option('description');
        $this->show_thank_you_detail = $this->get_option('show_thank_you_detail');
        $this->auth_code = $this->api_test_mode == 'yes' ? '305a9a777e42' : 'ae67b1668109';
        $this->api_userid = get_option('bitpay_payment_code') && $this->api_test_mode != 'yes' ? get_option('bitpay_payment_code') : 'e1ee96ba76032485';
        $this->order_status = $this->get_option('order_status') ? str_replace('wc-', '', $this->get_option('order_status')) : 'processing';
        if ($this->j5_mode == 'yes') {$this->order_status = 'processing';}
        $this->pagecode = 'e10278843d0e';
        $this->pagecode = $this->api_test_mode == 'yes' ? get_option('meshulam_apple_test_pagecode') : get_option('meshulam_apple_live_pagecode');
        $this->account_details = get_option(
            'apple_account_details',
            array(
                array(
                    'apple_greater_then' => $this->get_option('apple_greater_then'),
                    'apple_less_then' => $this->get_option('apple_less_then'),
                    'apple_max_payments' => $this->get_option('apple_max_payments'),
                ),
            )
        );
        $this->chargeType = ($this->j5_mode != 'yes') ? '1' : '2';
        $this->thank_you_page = $this->get_option('thank_you_page') ? $this->get_option('thank_you_page') : '';
        $this->fail_url = $this->get_option('fail_url') ? $this->get_option('fail_url') : '';
        $this->newapi_payment_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess' : 'https://secure.meshulam.co.il/api/light/server/1.0/createPaymentProcess';
        $this->j5_approve_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/settleSuspendedTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/settleSuspendedTransaction';
        $this->response_url = add_query_arg('wc-api', 'applepay_payment_gateway', home_url('/'));
        $this->invoiceNotifyUrl = add_query_arg('wc-api', 'meshulam_invoice_response', home_url('/'));
        $this->response_url = add_query_arg('key', uniqid(), $this->response_url);
        $this->refund_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/refundTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/refundTransaction';
        $this->getPaymentProcessInfo_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/getPaymentProcessInfo' : 'https://secure.meshulam.co.il/api/light/server/1.0/getPaymentProcessInfo';
        $this->approveTransaction = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/approveTransaction';
        if ($this->j5_mode != 'yes') {
            $this->response_url = add_query_arg('wc-api', 'apple_payment_gateway_direct_j4execute', home_url('/'));
            $this->update_url = add_query_arg('wc-api', 'apple_server_response_direct_j4execute', home_url('/'));
        }

        add_action('woocommerce_update_options_payment_gateways_' . $this->id, [$this, 'process_admin_options']);
        add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'save_account_details'));
        add_action('woocommerce_receipt_' . $this->id, [$this, 'receipt_newapi_page']);
        add_action('woocommerce_api_applepay_payment_gateway', [$this, 'ipn_response']);
        // handle apple server response
        add_action('woocommerce_api_apple_server_response', [$this, 'apple_server_response']);
        // handle ipn response direct j4 execute without j5
        add_action('woocommerce_api_apple_payment_gateway_direct_j4execute', [$this, 'ipn_response_direct_j4execute']);
        // handle apple server response direct j4 execute without j5
        add_action('woocommerce_api_apple_server_response_direct_j4execute', [$this, 'apple_server_response_direct_j4execute']);
        add_action('woocommerce_api_applepay_order_redirect', [$this, 'order_redirect']);
        add_filter('woocommerce_available_payment_gateways', [$this, 'apple_available_payment_gateways'], 99, 2);
        add_filter('woocommerce_gateway_title', [$this, 'apple_payment_gateway_title'], 104, 2);

        //check j5 status on order complete
        add_action('woocommerce_order_status_changed', [$this, 'woocommerce_order_status_changed_meshulamj5'], 10, 4);
        add_action( 'admin_notices', [$this, 'meshulam_admin_notice'] );

        $this->meshulam_add_file_ApplePay();
        $this->init_form_fields();
        $this->init_settings();
    }

    public function woocommerce_order_status_changed_meshulamj5($order_id, $from_status, $to_status, $instance)
    {
        if (is_admin()) {
            $order = wc_get_order($order_id);
            $passed = get_post_meta($order_id, 'order_already_passed', true);
            if ($passed == '1') {
                return;
            }
            $j5_mode = get_post_meta($order_id, 'meshulam_j5_on', true);
            $transactionId = get_post_meta($order_id, 'approved_transactionId', true);
            $transactionToken = get_post_meta($order_id, 'approved_transactionToken', true);
            $order_updated = get_post_meta($order_id, 'order_updated_byadmin_j5', true);

            if ($j5_mode == 'yes' && ($to_status == 'processing' || $to_status == 'completed') && $transactionId != '' && $transactionToken != '') {
                if ($order->get_payment_method() == 'bitpay-payment') {
                    $cls = new WC_BitPay_Meshulam_Gateway();
                    $auth_code = $cls->auth_code;
                    $userId = $cls->api_userid;
                    $pagecode = $cls->pagecode;
                    $j5_approve_url = $cls->j5_approve_url;
                    $update_url = $cls->update_url;
                    $response_url = $cls->response_url;
                    $chargeType = $cls->chargeType;
                } else if ($order->get_payment_method() == 'apple-payment') {
                    $cls = new WC_Apple_Meshulam_Gateway();
                    $auth_code = $cls->auth_code;
                    $userId = $cls->api_userid;
                    $pagecode = $cls->pagecode;
                    $j5_approve_url = $cls->j5_approve_url;
                    $update_url = $cls->update_url;
                    $response_url = $cls->response_url;
                    $chargeType = $cls->chargeType;
                } else {
                    $auth_code = $this->auth_code;
                    $userId = $this->api_userid;
                    $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
                    if ($pay_type == 1) {
                        $pagecode = $this->recurring_pagecode;
                    } //for recurring
                    else {
                        $pagecode = $this->regular_pagecode;
                    } // for simple
                    $j5_approve_url = $this->j5_approve_url;
                    $update_url = $this->update_url;
                    $response_url = $this->response_url;
                    $chargeType = $this->chargeType;
                }
                $args_body = array(
                    'apiKey' => $auth_code,
                    'userId' => $userId,
                    'transactionId' => $transactionId,
                    'transactionToken' => $transactionToken,
                    'sum' => $order->get_total(),
                );
                if ($order_updated == '1') {
                    $first_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
                    //get all items from order
                    $items = $order->get_items();
                    $fee = $order->get_items('fee');

                    $giftcard_amount = 0;
                    $giftcards = $order->get_items('gift_card');
                    if ($giftcards) {
                        foreach ($giftcards as $gift_item) {
                            $giftcard_amount = $gift_item->get_captured_amount();
                        }
                    }

                    $pw_gift_card = $order->get_items('pw_gift_card');
                    $gift_amnt = 0;
                    $coupons = $order->get_items('coupon');
                    if (!empty($coupons)) {
                        $extra = get_post_meta($order_id, 'smart_coupons_contribution', true, true);
                        if (!empty($extra)) {
                            foreach ($extra as $ext) {
                                $gift_amnt += $ext;
                            }
                        }
                    }
                    if (!empty($pw_gift_card)) {
                        foreach ($pw_gift_card as $key => $line) {
                            $gift_amnt += $line->get_amount();
                        }
                    }

                    if (!empty($giftcard_amount)) {
                        $gift_amnt += $giftcard_amount;
                    }

                    $yith_discount = 0;
                    if ($order->get_coupon_codes()) {
                        foreach ($order->get_coupon_codes() as $code) {
                            if ( class_exists( 'YITH_YWGC' ) ) {
                                $gift = YITH_YWGC()->get_gift_card_by_code($code);
                                if ($gift instanceof YITH_YWGC_Gift_Card) {
                                    foreach ($order->get_items('coupon') as $coupon_item) {
                                        if ($coupon_item->get_code() === $code) {
                                            $yith_discount += $coupon_item->get_discount();
                                        }
                                    }
                                }
                            }
                        }
                    }

                    $order_id = $order->get_id();
                    update_post_meta($order_id, 'order_already_passed', '0');
                    $customer_note = array();
                    foreach ($items as $item) {
                        $item_total = $item->get_total();
                        $item_quantity = $item->get_quantity();
                        $customer_note[] = $item->get_name() . '[ כמות: ' . $item_quantity . ' | מחיר: ' . number_format($item_total, 2) . ']';
                    }
                    $customer_note = implode(',', $customer_note);
                    $pay_num = unserialize($order->get_meta('meshulam_pay_payment-number'));

                    if ($pay_num == '' || $pay_num == '0') {
                        $pay_num = 1;
                    }
                    $shipping_charge = $order->get_total_shipping();
                    $tax_total = $order->get_total_tax();
                    //send it to API as a description
                    $customer_note = 'תשלום עבור הזמנה:' . $order_id;
                    $this->invoiceNotifyUrl = add_query_arg('order_id', $order_id, $this->invoiceNotifyUrl);

                    $args_body['pageCode'] = $pagecode;
                    if ($pay_num != '180') {
                        $args_body['paymentNum'] = $pay_num;
                    }
                    $args_body['successUrl'] = $response_url;
                    $args_body['cancelUrl'] = wc_get_checkout_url();
                    $args_body['notifyUrl'] = $update_url;
                    $args_body['invoiceNotifyUrl'] = $this->invoiceNotifyUrl;
                    $args_body['description'] = $customer_note;
                    $args_body['pageField[fullName]'] = $first_name;
                    $args_body['pageField[phone]'] = $order->get_billing_phone();
                    $args_body['pageField[email]'] = $order->get_billing_email();
                    $args_body['cField1'] = $order->get_id();
                    $args_body['chargeType'] = $chargeType;
                    $i = 0;
                    foreach ($items as $item) {
                        $prdct_name = $item->get_name();
                        $product_variation_id = $item['variation_id'];
                        if ($product_variation_id) {
                            $product = wc_get_product($item['variation_id']);
                            $product_id = $item['variation_id'];
                        } else {
                            $product = wc_get_product($item['product_id']);
                            $product_id = $item['product_id'];
                        }
                        $sku = $product->get_sku();
                        if ($sku == '') {
                            $sku = $product_id;
                        }

                        $sub = strip_tags(wc_price($item->get_total()));
                        if( $yith_discount ){
                            $sub = strip_tags(wc_price($item->get_subtotal()));
                        }

                        $curr = get_woocommerce_currency_symbol($order->get_currency());
                        $item_sum = str_replace($curr, '', $sub);
                        $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

                        $args_body['productData'][$i]['catalogNumber'] = $sku;
                        $args_body['productData'][$i]['price'] = $item_sum;
                        $args_body['productData'][$i]['itemDescription'] = $prdct_name;
                        $args_body['productData'][$i]['quantity'] = $item->get_quantity();
                        $i++;
                    }
                    if (!empty($fee)) {
                        foreach ($fee as $item) {

                            $sub = strip_tags(wc_price($item->get_total()));
                            $curr = get_woocommerce_currency_symbol($order->get_currency());
                            $item_sum = str_replace($curr, '', $sub);
                            $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

                            $args_body['productData'][$i]['catalogNumber'] = '000000';
                            $args_body['productData'][$i]['price'] = $item_sum;
                            $args_body['productData'][$i]['itemDescription'] = $item->get_name();
                            $args_body['productData'][$i]['quantity'] = $item->get_quantity();
                            $i++;
                        }
                    }
                    if ($gift_amnt > 0) {
                        $args_body['productData'][$i]['catalogNumber'] = '000000';
                        $args_body['productData'][$i]['price'] = '-' . $gift_amnt;
                        $args_body['productData'][$i]['itemDescription'] = 'כרטיס מתנה';
                        $args_body['productData'][$i]['quantity'] = '1';
                        $i++;
                    }
                    if ($shipping_charge > 0) {
                        $args_body['productData'][$i]['catalogNumber'] = '000000';
                        $args_body['productData'][$i]['price'] = $shipping_charge;
                        $args_body['productData'][$i]['itemDescription'] = 'עלות משלוח';
                        $args_body['productData'][$i]['quantity'] = '1';
                        $i++;
                    }
                    if ($tax_total > 0) {
                        $args_body['productData'][$i]['catalogNumber'] = '000001';
                        $args_body['productData'][$i]['price'] = $tax_total;
                        $args_body['productData'][$i]['itemDescription'] = 'תוספת מס';
                        $args_body['productData'][$i]['quantity'] = '1';
                        $i++;
                    }
                }
                if ($this->debug == 'yes') {
                    $logger = wc_get_logger();
                    $logger->add('meshulam_j5_process', 'Before Sending Data to Meshulam');
                    $logger->add('meshulam_j5_process', 'Request: ' . print_r($args_body, true));
                }
                $args = [
                    'method' => 'POST',
                    'timeout' => 45,
                    'redirection' => 5,
                    'httpversion' => '1.0',
                    'blocking' => true,
                    'headers' => [],
                    'body' => $args_body,
                    'cookies' => [],
                ];
                $res = wp_remote_post($j5_approve_url, $args);
                if (is_wp_error($res)) {
                    if ($this->debug == 'yes') {
                        $logger->add('meshulam_j5_process', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                    }
                } else {
                    if ($this->debug == 'yes') {
                        $logger->add('meshulam_j5_process', 'WP Remote Post Completed');
                        $data = json_decode($res['body']);
                        $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                        $logger->add('meshulam_j5_process', 'WP Remote Post Response: ' . print_r($file_data, true));
                    }
                    $body = json_decode($res['body'], true);
                    if ($body["status"] == 1) {
                        update_post_meta($order_id, 'order_already_passed', '1');
                        $asmachta = $body['data']['asmachta'];
                        update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);
                        $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $transactionId));
                    } else {
                        $order->update_status('on-hold', $body['err']['message']);
                        $order->add_meta_data('meshulam_payment_error', 'בבקשה נסה שוב', true);
                    }
                }
            }else{
                if( $to_status == 'processing' || $to_status == 'completed' ){
                    $notice = __('Please Try Again, Or contact to grow.', 'meshulam');
                    if( session_status() == PHP_SESSION_NONE ){
                        session_start();
                    }
                    $_SESSION['meshulam_notice'] = $notice;
                }
            }
        }
    }

    public function meshulam_admin_notice(){
        if( session_status() == PHP_SESSION_NONE ){
            session_start();
        }
        if( isset( $_SESSION['meshulam_notice'] ) ){
            ?>
            <div class="notice notice-error is-dismissible">
                <p><?php _e( 'Please Try Again, Or contact to grow.', 'meshulam' ); ?></p>
            </div>
            <?php
            unset( $_SESSION['meshulam_notice'] );
        }
    }

    public function apple_payment_gateway_title($title, $payment_id)
    {
        if ($payment_id === 'apple-payment' && is_admin()) {
            $title = $this->method_title;
        }
        return $title;
    }
    public function apple_available_payment_gateways($available_gateways)
    {
        if (!is_checkout()) {
            return $available_gateways;
        }

        if (array_key_exists('apple-payment', $available_gateways)) {
            $available_gateways['apple-payment']->order_button_text = $this->apple_pay_title;
        }

        $useragent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        if (stripos($useragent, 'Chrome') !== false) {
            unset($available_gateways['apple-payment']);
        } else if (stripos($useragent, 'Safari') !== false) {
        } else {
            unset($available_gateways['apple-payment']);
        }
        return $available_gateways;
    }
    public function change_checkout_button_text($button_text)
    {
        if ($this->apple_pay_title != '') {
            return $this->apple_pay_title;
        }
        return $button_text;
    }
    //refund order process
    public function process_refund($order_id, $amount = null, $reason = '')
    {
        $transactionId = get_post_meta($order_id, 'approved_transactionId', true);
        $transactionToken = get_post_meta($order_id, 'approved_transactionToken', true);
        if ($transactionId != '' && $transactionToken != '') {
            $args_body = array(
                'pageCode' => $this->pagecode,
                'transactionId' => $transactionId,
                'transactionToken' => $transactionToken,
                'refundSum' => $amount,
            );
            if ($this->debug == 'yes') {
                $logger = wc_get_logger();
                $logger->add('meshulam_refund_process', 'Before Sending Data to Meshulam');
                $logger->add('meshulam_refund_process', 'Request: ' . print_r($args_body, true));
            }
            $args = [
                'method' => 'POST',
                'timeout' => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => [],
                'body' => $args_body,
                'cookies' => [],
            ];
            $res = wp_remote_post($this->refund_url, $args);
            if (is_wp_error($res)) {
                if ($this->debug == 'yes') {
                    $logger->add('meshulam_refund_process', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                    return false;
                }
            } else {
                if ($this->debug == 'yes') {
                    $data = json_decode($res['body']);
                    $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    $logger->add('meshulam_refund_process', 'WP Remote Post Completed');
                    $logger->add('meshulam_refund_process', 'WP Remote Post Response: ' . print_r($file_data, true));
                }
                $body = json_decode($res['body'], true);
                if ($body["status"] == 1) {
                    return true;
                } else {
                    return false;
                }

            }
        }
        return false;
    }

    // Detect special conditions devices
    public function get_user_platform()
    {

        $iPod = stripos($_SERVER['HTTP_USER_AGENT'], "iPod");
        $iPhone = stripos($_SERVER['HTTP_USER_AGENT'], "iPhone");
        $iPad = stripos($_SERVER['HTTP_USER_AGENT'], "iPad");
        $Android = stripos($_SERVER['HTTP_USER_AGENT'], "Android");
        $webOS = stripos($_SERVER['HTTP_USER_AGENT'], "webOS");

        $platform = 'web';
        if ($iPod || $iPhone) {
            $platform = 'iphone';
        } else if ($iPad) {
            $platform = 'iphone';
        } else if ($Android) {
            $platform = 'android';
        } else if ($webOS) {
            $platform = 'web';
        }

        return $platform;
    }

    // init form fields
    public function init_form_fields()
    {
        $available_statuses = wc_get_order_statuses();
        unset($available_statuses['wc-pending']);
        unset($available_statuses['wc-cancelled']);
        unset($available_statuses['wc-refunded']);
        unset($available_statuses['wc-failed']);
        $meshulam_j5_status = get_option('meshulam_j5_status');
        if ($meshulam_j5_status != '1') {
            $j5_class = 'hide-input hide';
        } else {
            $j5_class = '';
        }
        $payment_type_array = array(
            'payments_4' => __('Payments', 'meshulam-payment-gateway'),
        );
        $meshulam_refund_status = get_option('meshulam_refund_status');
        if ($meshulam_refund_status != '1') {
            $refund_j5_class = 'hide-input hide';
        } else {
            $refund_j5_class = '';
        }
        $this->form_fields = [
            'enabled' => [
                'title' => __('Enable/Disable', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'label' => __('Enable Apple payment Gateway', 'meshulam-payment-gateway'),
                'default' => 'yes',
            ],
            'title' => [
                'title' => __('Title', 'meshulam-payment-gateway'),
                'type' => 'text',
                'description' => __('The title which visible during checkout.', 'meshulam-payment-gateway'),
                'default' => __('תשלום באמצעות apple', 'meshulam-payment-gateway'),
                'desc_tip' => true,
            ],
            'apple_pay_title' => [
                'title' => __('Text button', 'meshulam-payment-gateway'),
                'type' => 'text',
                'default' => 'המשך לרכישה',
            ],
            'description' => [
                'title' => __('Description', 'meshulam-payment-gateway'),
                'type' => 'textarea',
                'default' => __('', 'meshulam-payment-gateway'),
            ],
            'order_status' => [
                'title' => __('Order status', 'meshulam-payment-gateway'),
                'type' => 'select',
                'description' => __('Choose an "order status" for paid orders', 'meshulam-payment-gateway'),
                'options' => $available_statuses,
            ],
            'payment_type' => [
                'title' => __('The payment type', 'meshulam-payment-gateway'),
                'type' => 'multiselect',
                'options' => $payment_type_array,
                'default' => '',
                'description' => __('', 'meshulam-payment-gateway'),
            ],
            'maxpayment' => [
                'title' => __('Number of max payments', 'meshulam-payment-gateway'),
                'type' => 'select',
                'options' => array(
                    '0' => __('Select Number', 'meshulam-payment-gateway'),
                    '1' => __('1', 'meshulam-payment-gateway'),
                    '2' => __('2', 'meshulam-payment-gateway'),
                    '3' => __('3', 'meshulam-payment-gateway'),
                    '4' => __('4', 'meshulam-payment-gateway'),
                    '5' => __('5', 'meshulam-payment-gateway'),
                    '6' => __('6', 'meshulam-payment-gateway'),
                    '7' => __('7', 'meshulam-payment-gateway'),
                    '8' => __('8', 'meshulam-payment-gateway'),
                    '9' => __('9', 'meshulam-payment-gateway'),
                    '10' => __('10', 'meshulam-payment-gateway'),
                    '11' => __('11', 'meshulam-payment-gateway'),
                    '12' => __('12', 'meshulam-payment-gateway'),
                ),
                'default' => '',
                'description' => __('Number of max payments', 'meshulam-payment-gateway'),
            ],
            'account_details' => array(
                'type' => 'account_details',
            ),
            'api_test_mode' => [
                'title' => __('Development Mode', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'label' => __('Enable/Disable Test Mode', 'meshulam-payment-gateway'),
            ],
            'refund_mode' => array(
                'title' => __('Refund Payment Mode', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'class' => $refund_j5_class,
                'label' => __('Enable/Disable Refund Payment Mode', 'meshulam-payment-gateway'),
            ),
            'j5_mode' => array(
                'title' => __('J5 Mode', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'class' => $j5_class,
                'label' => __('Enable/Disable J5 Mode', 'meshulam-payment-gateway'),
                'description' => __('When the option for J5 is running the orders come in under hold status and only after manual editing and status change to complete will the customer be charged.
				If the status is not changed to be completed within 72 hours, the order status changes to a canceled state because the transaction has expired.
				', 'meshulam-payment-gateway'),
            ),
            'apple_debug' => array(
                'title' => __('Debug log', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'label' => __('Enable logging', 'meshulam-payment-gateway'),
                'default' => 'yes',
            ),

            'thank_you_page_details' => array(
                'title' => __('More settings ', 'meshulam-payment-gateway'),
                'type' => 'title',
            ),
            'show_thank_you_detail' => array(
                'title' => __('Show custom Thank you page', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'label' => __('Show', 'meshulam-payment-gateway'),
                'default' => 'no',
            ),
            'thank_you_page' => array(
                'title' => __('Thank You Page', 'meshulam-payment-gateway'),
                'type' => 'text',
                'description' => __('Where customers should be redirect after successful pursase', 'meshulam-payment-gateway'),
            ),
            'fail_url' => array(
                'title' => __('Failure URL', 'meshulam-payment-gateway'),
                'type' => 'text',
                'description' => __('Where customers should be redirect after failed pursase', 'meshulam-payment-gateway'),
            ),
        ];
    }
    public function generate_account_details_html()
    {
        ob_start();
        ?>
		<tr valign="top" class="meshulam_acc">
			<th scope="row" class="titledesc"><?php esc_html_e('Payments range', 'meshulam-payment-gateway');?></th>
			<td class="forminp" id="bacs_accounts">
				<div class="wc_input_table_wrapper">
					<p><?php esc_html_e('If the amount of buy', 'meshulam-payment-gateway');?></p>
					<table class="widefat wc_input_table sortable" cellspacing="0">
						<thead>
							<tr>
								<th class="sort">&nbsp;</th>
								<th><?php esc_html_e('Greater then:', 'meshulam-payment-gateway');?></th>
								<th><?php esc_html_e('Smaller then:', 'meshulam-payment-gateway');?></th>
								<th><?php esc_html_e('Max payments', 'meshulam-payment-gateway');?></th>
								<th></th>
							</tr>
						</thead>
						<tbody class="accounts">
							<?php
                            $i = -1;
                            if ($this->account_details) {
                                foreach ($this->account_details as $account) {
                                    if (!empty(wp_unslash($account['apple_greater_then']))) {
                                        echo '<tr class="account">
                                                            <td class="sort"></td>
                                                            <td><input type="text" value="' . esc_attr(wp_unslash($account['apple_greater_then'])) . '" name="apple_greater_then[' . esc_attr($i) . ']" autocomplete="false"/></td>
                                                            <td><input type="text" value="' . esc_attr($account['apple_less_then']) . '" name="apple_less_then[' . esc_attr($i) . ']" autocomplete="false"/></td>
                                                            <td><input type="number" class="apple_max_payments" value="' . esc_attr(wp_unslash($account['apple_max_payments'])) . '" name="apple_max_payments[' . esc_attr($i) . ']" autocomplete="false"/></td>
                                                            </tr>';
                                        $i++;
                                    }
                                }
                            }
                            ?>
						</tbody>
						<tfoot>
							<tr>
								<th colspan="7"><a href="#"
									class="add button"><?php esc_html_e('+ Add More', 'meshulam-payment-gateway');?></a>
									<a href="#"
									class="remove_rows button"><?php esc_html_e('Delete', 'meshulam-payment-gateway');?></a>
								</th>
							</tr>
						</tfoot>
					</table>
				</div>
				<script type="text/javascript">
					jQuery(function() {
						jQuery(document).on('click', 'a.add', function() {
							var size = jQuery('#bacs_accounts').find('tbody .account').length;
							var max = 0;
							jQuery('#woocommerce_apple-payment_payment_type :selected').each(function(i){
								if(jQuery(this).val() == 'payments_4'){
									max = jQuery('#woocommerce_apple-payment_maxpayment').val();
								}
							});


							jQuery('<tr class="account">\
								<td class="sort"></td>\
								<td><input type="text" name="apple_greater_then[' + size + ']" autocomplete="false"/></td>\
								<td><input type="text" name="apple_less_then[' + size + ']" autocomplete="false"/></td>\
								<td><input type="number" class="apple_max_payments" name="apple_max_payments[' + size + ']" autocomplete="false"/></td>\
								</tr>').appendTo('#bacs_accounts table tbody');

							if(max > 0){
								jQuery(".apple_max_payments").attr({"max" : max});
							}
							return false;
						});
					});
				</script>
			</td>
		</tr>
		<?php
return ob_get_clean();
    }
    public function save_account_details()
    {
        $accounts = array();
        if (isset($_POST['apple_greater_then']) && isset($_POST['apple_less_then']) && isset($_POST['apple_max_payments'])) {
            $apple_greater_then = wc_clean(wp_unslash($_POST['apple_greater_then']));
            $apple_less_then = wc_clean(wp_unslash($_POST['apple_less_then']));
            $apple_max_payments = wc_clean(wp_unslash($_POST['apple_max_payments']));
            foreach ($apple_greater_then as $i => $name) {
                if (empty($apple_greater_then[$i])) {
                    continue;
                }
                $accounts[] = array(
                    'apple_greater_then' => $apple_greater_then[$i],
                    'apple_less_then' => $apple_less_then[$i],
                    'apple_max_payments' => $apple_max_payments[$i],
                );
            }
        }
        // phpcs:enable
        update_option('apple_account_details', $accounts);
    }
    public function validate_fields()
    {
        global $woocommerce;
        if (isset($_POST['billing_phone'])) {
            $pattern = '/^(050|051|052|053|054|055|057|058)-?\d{7}$/';
            $valid_number = str_replace('-', '', $_POST['billing_phone']);
            if (!preg_match($pattern, $valid_number) || !is_numeric($_POST['billing_phone'])) {
                wc_add_notice(__('נא להזין מספר סלולרי בלבד עד 10 ספרות ללא רוווחים או סימנים מיוחדים', 'meshulam-payment-gateway'), 'error');
            }
        }
        return true;
    }
    // custom option page html
    public function admin_options()
    {
        $title = __('Apple Payment', 'meshulam-payment-gateway');
        $description = __('apple Payment method by Meshulam', 'meshulam-payment-gateway');
        $credit = __('Developed by <a href="https://codeandcore.co.il/">Code&Core</a>', 'meshulam-payment-gateway');
        ob_start();
        $this->generate_settings_html();
        $settings = ob_get_clean();

        echo "<div id='Meshulam-options'>
		<h1>$title</h1>

		<table class='form-table'>$settings</table>
		</div>";
    }

    // remove credit card form from checkout
    public function payment_fields()
    {
        if ($this->supports('tokenization') && is_checkout()) {
            $this->tokenization_script();
            $this->saved_payment_methods();
            $this->save_payment_method_checkbox();
        }

        if ($this->description) {
            echo '<p>' . $this->description . '</p>';
        }
        ?>
		<script>
			if (jQuery('label.direct_db').length > 0) {
				jQuery('input#payment_method_apple-payment').prop('checked', false);
				jQuery('li.wc_payment_method.payment_method_apple-payment').hide();
			}
			if (jQuery('.payment_box.payment_method_apple-payment').children('fieldset').length <= 0) {
				jQuery('.payment_box.payment_method_apple-payment').addClass('hide_box');
			} else {
				jQuery('.payment_box.payment_method_apple-payment').removeClass('hide_box');
			}
		</script>

		<?php
if (empty($this->payment_type)) {
            echo '<input type="hidden" name="apple_pay_exp_type" value="2">';
        } else {

            echo '<fieldset id="wc-' . esc_attr($this->id) . '-cc-form" class="wc-payment-form wc-meshulam-payment-form" style="background:transparent;">';
            if (in_array("payments_4", $this->payment_type)) {
                $pay_id = 'payments_4';?>
					<div class="form-row form-row-radio">
					<input type="radio" name="apple_pay_exp_type" class="apple_pay_exp_type"
					id="apple_pay_expmonth_<?php echo $pay_id; ?>" value="4" checked="checked">
					<label for="apple_pay_expmonth_<?php echo $pay_id; ?>">
						<span class="required"></span>
						<?php _e('Payments', 'meshulam-payment-gateway');?>
					</label>
				</div>
				<?php global $woocommerce;
                $amount = number_format($woocommerce->cart->total, 2, '.', '');?>
				<div class="form-row form-row-select apple_pay_payments active">
					<label for="apple_pay_exp_numpayment"><span class="required"></span></label>
					<select id="apple_pay_numpayment" name="apple_pay_exp_numpayment" autocomplete="false">
						<option value="1">1 (<?php _e('Regular', 'meshulam-payment-gateway');?>)</option>
						<?php $loop = 'no';
                $loop_start = true;
                $i = 0;
                if (!empty($this->account_details) && count($this->account_details) != 0) {
                    foreach ($this->account_details as $account) {
                        print_r($account);
                        if (!empty($account['apple_less_then']) || !empty($account['apple_greater_then'])) {
                            $loop = 'yes';
                            if (!empty($account['apple_less_then'])) {$max_val = $account['apple_less_then'];} else { $max_val = (float) 1000000;};
                            if (!empty($account['apple_greater_then'])) {$min_val = $account['apple_greater_then'];} else { $min_val = (int) 0;};
                            if (($min_val <= $amount) && ($amount <= $max_val)) {
                                if ($loop_start == true):
                                    $i = 1;
                                    for ($i = 2; $i <= $account['apple_max_payments']; $i++) {?>
													<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
												<?php }$loop_start = false;endif;
                            }
                        }
                    }
                } else {
                    for ($i = 2; $i <= $this->maxpayment; $i++) {?>
									<option value="<?php echo $i; ?>"><?php echo $i; ?></option>
								<?php }
                }?>
					</select>
				</div>
			<?php }

            echo '</fieldset>';
        }
    }

    public function redirect_order_received($order_id)
    {
        $order = wc_get_order($order_id);
        $redirect = $this->get_return_url($order);
        if (isset($_GET['response'])):
            if ('success' == $_GET['response']) {
                if (!empty($this->thank_you_page) && $this->show_thank_you_detail == 'yes') {
                    $redirect = $this->thank_you_page;
                }
            } else {
                if (isset($this->fail_url) && !empty($this->fail_url)) {
                    $redirect = $this->fail_url;
                }
            }
            $redirect = add_query_arg('order_id', $order_id, $redirect);
            echo '<html><head><script>window.top.location.href = "' . $redirect . '";</script></head></html>';
            exit;
        endif;
        exit;
    }

    // redirect to receipt page (payment page)
    public function process_payment($order_id)
    {
        $order = wc_get_order($order_id);
        $redirect_to = $order->get_checkout_payment_url(true);
        $exp_type = serialize($_POST['apple_pay_exp_type']);
        if (isset($_POST['apple_pay_exp_numpayment'])) {
            $exp_numpayment = serialize($_POST['apple_pay_exp_numpayment']);
        } else {
            $exp_numpayment = '';
        }
        delete_post_meta($order->get_id(), 'apple_pay_payment-type');
        delete_post_meta($order->get_id(), 'apple_pay_payment-number');
        update_post_meta($order->get_id(), 'apple_pay_payment-type', $exp_type, true);
        update_post_meta($order->get_id(), 'apple_pay_payment-number', $exp_numpayment, true);
        return array(
            'result' => 'success',
            'redirect' => $redirect_to,
        );
    }
    //receipt page with new api
    public function receipt_newapi_page($order_id)
    {
        $logger = wc_get_logger();
        $order = wc_get_order($order_id);
        update_post_meta($order_id, 'order_already_passed', '0');
        //check order already paid or not before iframe
        $token = unserialize(get_post_meta($order_id, 'applepay_card_token_detail', true));
        $transaction_id = get_post_meta($order_id, 'applepay_transaction_id', true);
        //if order already completed
        $status = $order->get_status();
        $first_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
        if ($status == 'processing' || $status == 'completed') {
            $redirect_url = isset($this->thank_you_page) && !empty($this->thank_you_page) ? $this->thank_you_page : $order->get_checkout_order_received_url();
            die('<script>window.top.location.href = "' . $redirect_url . '";</script>');
        }
        $return_url = add_query_arg('wc-api', 'applepay_order_redirect', home_url('/'));
        $return_url = add_query_arg('order_id', $order_id, $return_url);
        $items = $order->get_items();
        $fee = $order->get_items('fee');

        $giftcard_amount = 0;
        $giftcards = $order->get_items('gift_card');
        if ($giftcards) {
            foreach ($giftcards as $gift_item) {
                $giftcard_amount = $gift_item->get_captured_amount();
            }
        }

        $pw_gift_card = $order->get_items('pw_gift_card');
        $gift_amnt = 0;
        $coupons = $order->get_items('coupon');
        if (!empty($coupons)) {
            $extra = get_post_meta($order_id, 'smart_coupons_contribution', true, true);
            if (!empty($extra)) {
                foreach ($extra as $ext) {
                    $gift_amnt += $ext;
                }
            }
        }
        if (!empty($pw_gift_card)) {
            foreach ($pw_gift_card as $key => $line) {
                $gift_amnt += $line->get_amount();
            }
        }

        if (!empty($giftcard_amount)) {
            $gift_amnt += $giftcard_amount;
        }

        $yith_discount = 0;
        if ($order->get_coupon_codes()) {
            foreach ($order->get_coupon_codes() as $code) {
                if ( class_exists( 'YITH_YWGC' ) ) {
                    $gift = YITH_YWGC()->get_gift_card_by_code($code);
                    if ($gift instanceof YITH_YWGC_Gift_Card) {
                        foreach ($order->get_items('coupon') as $coupon_item) {
                            if ($coupon_item->get_code() === $code) {
                                $yith_discount += $coupon_item->get_discount();
                            }
                        }
                    }
                }
            }
        }

        $customer_note = array();
        foreach ($items as $item) {
            $item_total = $item->get_total();
            $item_quantity = $item->get_quantity();
            $customer_note[] = $item->get_name() . '[ כמות: ' . $item_quantity . ' | מחיר: ' . number_format($item_total, 2) . ']';
        }
        $customer_note = implode(',', $customer_note);
        $customer_note = 'תשלום עבור הזמנה:' . $order_id;
        $shipping_charge = $order->get_total_shipping();
        $tax_total = $order->get_total_tax();
        $pay_num = unserialize($order->get_meta('apple_pay_payment-number'));
        if ($pay_num == '') {$pay_num = 1;}
        $pay_type = unserialize($order->get_meta('apple_pay_payment-type'));
        $this->invoiceNotifyUrl = add_query_arg('order_id', $order_id, $this->invoiceNotifyUrl);
        $args_body = array(
            'pageCode' => $this->pagecode,
            'apiKey' => $this->auth_code,
            'userId' => $this->api_userid,
            'sum' => $order->get_total(),
            'successUrl' => $this->response_url,
            'cancelUrl' => wc_get_checkout_url(),
            'notifyUrl' => $this->update_url,
            'invoiceNotifyUrl' => $this->invoiceNotifyUrl,
            'description' => $customer_note,
            'pageField[fullName]' => $first_name,
            'pageField[phone]' => $order->get_billing_phone(),
            'pageField[email]' => $order->get_billing_email(),
            'cField1' => $order->get_id(),
        );

        if ($pay_num != '180') {
            $args_body['paymentNum'] = $pay_num;
        }

        $args_body['chargeType'] = $this->chargeType;
        $i = 0;
        foreach ($items as $item) {
            $product_variation_id = $item['variation_id'];
            if ($product_variation_id) {
                $product = wc_get_product($item['variation_id']);
                $product_id = $item['variation_id'];
            } else {
                $product = wc_get_product($item['product_id']);
                $product_id = $item['product_id'];
            }
            $sku = $product->get_sku();
            if ($sku == '') {
                $sku = $product_id;
            }

            $sub = strip_tags( wc_price( $item->get_total() ) );
            if( $yith_discount ){
                $sub = strip_tags(wc_price($item->get_subtotal()));
            }

            $curr = get_woocommerce_currency_symbol( $order->get_currency() );
            $item_sum = str_replace( $curr, '', $sub );
            $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

            $args_body['productData'][$i]['catalogNumber'] = $sku;
            $args_body['productData'][$i]['price'] = $item_sum;
            $args_body['productData'][$i]['itemDescription'] = $item->get_name();
            $args_body['productData'][$i]['quantity'] = $item->get_quantity();
            $i++;
        }
        if (!empty($fee)) {
            foreach ($fee as $item) {

                $sub = strip_tags( wc_price( $item->get_total() ) );
                $curr = get_woocommerce_currency_symbol( $order->get_currency() );
                $item_sum = str_replace( $curr, '', $sub );
                $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

                $args_body['productData'][$i]['catalogNumber'] = '000000';
                $args_body['productData'][$i]['price'] = $item_sum;
                $args_body['productData'][$i]['itemDescription'] = $item->get_name();
                $args_body['productData'][$i]['quantity'] = $item->get_quantity();
                $i++;
            }
        }
        if ($gift_amnt > 0) {
            $args_body['productData'][$i]['catalogNumber'] = '000000';
            $args_body['productData'][$i]['price'] = '-' . $gift_amnt;
            $args_body['productData'][$i]['itemDescription'] = 'כרטיס מתנה';
            $args_body['productData'][$i]['quantity'] = '1';
            $i++;
        }
        if ($shipping_charge > 0) {
            $args_body['productData'][$i]['catalogNumber'] = '000000';
            $args_body['productData'][$i]['price'] = $shipping_charge;
            $args_body['productData'][$i]['itemDescription'] = 'עלות משלוח';
            $args_body['productData'][$i]['quantity'] = '1';
            $i++;
        }
        if ($tax_total > 0) {
            $args_body['productData'][$i]['catalogNumber'] = '000001';
            $args_body['productData'][$i]['price'] = $tax_total;
            $args_body['productData'][$i]['itemDescription'] = 'תוספת מס';
            $args_body['productData'][$i]['quantity'] = '1';
            $i++;
        }
        if ($this->debug == 'yes') {
            $logger->add('apple_process_payment_newapi', 'Before Sending Data to Meshulam');
            $logger->add('apple_process_payment_newapi', 'Request: ' . print_r($args_body, true));
        }

        $args = [
            'method' => 'POST',
            'timeout' => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'headers' => [],
            'body' => $args_body,
            'cookies' => [],
        ];
        $res = wp_remote_post($this->newapi_payment_url, $args);
        if (is_wp_error($res)) {
            if ($this->debug == 'yes') {
                $logger->add('apple_process_payment_newapi', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('apple_process_payment_newapi', 'WP Remote Post Completed');
                $logger->add('apple_process_payment_newapi', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
            $args = array($order_id);
            $this->get_payment_page($res, $order);
            $meshulam_force_regular_payment = get_option('meshulam_force_regular_payment');
            if ($this->j5_mode != 'yes') {
                $args = array($order_id);
                wp_schedule_single_event(time() + 300, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
                wp_schedule_single_event(time() + 960, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
                wp_schedule_single_event(time() + 3360, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
            }
        }
    }

    // get payment page
    public function get_payment_page($response, WC_Order $order)
    {
        if (!is_wp_error($response)) {
            $order_id = $order->get_id();
            $body = json_decode($response['body'], true);
            if ($body["status"] == 1) {
                $token_val = serialize($body["data"]["processToken"]);
                $payment_id = $body["data"]["processId"];
                delete_post_meta($order->get_id(), 'applepay_card_token_detail');
                delete_post_meta($order->get_id(), 'applepay_transaction_id');
                update_post_meta($order->get_id(), 'applepay_card_token_detail', $token_val, true);
                update_post_meta($order->get_id(), 'applepay_transaction_id', $payment_id, true);
                update_post_meta($order->get_id(), 'meshulam_j5_on', $this->j5_mode, true);
                $order->save();

                //echo iframe url so popup js will get it and show in new window
                echo $body["data"]["url"];
                exit;
                ?>
				<script>
							window.addEventListener('message', function (result) {
							if (result.origin === 'https://meshulam.co.il' || result.origin === 'https://sandbox.meshulam.co.il' || result.origin === 'https://secure.meshulam.co.il'){
							switch (result.data.action){
								case 'close' :{
									console.log(0);
									document.getElementsByTagName('iframe')[0].style.setProperty('display','none');
									window.location.reload();
									break;
								}
								case 'payment' :{
									if(result.data.status == 1){
										// success
									}
									break;
									}
								case 'failed_to_load_page':{
									<?php
if (isset($this->fail_url) && !empty($this->fail_url)) {
                    $fail_url = $this->fail_url . '?order_error=failer&order_id=' . $order_id;
                } else {
                    $fail_url = wc_get_checkout_url();
                }
                ?>
									window.top.location.href = "<?php echo $fail_url; ?>";
								break;
								}
							}
						}
						});
							jQuery(document).ready(function() {
								window.addEventListener('message', function(e) {
									if (e.data.hasOwnProperty("MeshulamActiveLoader_nauK1M54J") && e.data
										.MeshulamActiveLoader_nauK1M54J == 1) {
										jQuery('.payment_loader').show();
								}
								if (e.data.hasOwnProperty("MeshulamCancelBitPayment_nauK1M54J") || e.data ==
									'MeshulamCancelBitPayment_nauK1M54J') {
									window.top.location.href = "<?php echo wc_get_checkout_url(); ?>";
							}
						});
							});
						</script>
				<a href="javascript:void()" id="open_apple_window">Click to pay</a>
				<script>
					$('#open_apple_window').click(function(){
					let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
					open('<?php echo $body["data"]["url"]; ?>', 'test', params);
					});
				</script>
					<?php
} else {
                ?>
					<div id="meshulam-iframe-container">
					<div class="close_popup_meshulam"><img src="<?php echo MESHULAM_PLUGIN_URL . 'assets/images/close-icon.png'; ?>" height="30" width="30"> </div>
						<h2 style="color: #e61717; background: #000; text-align: center; padding: 20px; position: absolute; top: 40%; border-radius: 20px; max-width: 90%; left: 0; right: 0; margin: 0 auto;"><?php echo __('Failed ', 'bit-payment-gateway') . $body["err"]["message"]; ?></h2>
					</div>
					<?php
return;
            }
        } else {
            ?>
				<div id="meshulam-iframe-container">
					<h2><?php echo __('Connection error.', 'apple-payment-gateway'); ?></h2>
				</div>
				<?php
return;
        }

    }
    public function order_redirect()
    {

        $order_id = $_REQUEST['order_id'];
        $order = wc_get_order($order_id);
        $status = $order->get_status();
        if ($status == 'processing' || $status == 'completed') {
            $redirect_url = isset($this->thank_you_page) && !empty($this->thank_you_page) ? $this->thank_you_page : $order->get_checkout_order_received_url();
            wp_redirect($redirect_url);
            exit;
        }
        $status = get_post_meta($order_id, 'apple_transaction_status', true);
        if ($status) {
            //complete order payment
            if (1 == $status) {
                $asmatcha = get_post_meta($order_id, 'apple_transaction_asmatcha', true);
                $tr_id = get_post_meta($order_id, 'meshulam_return_transaction_id', true);
                $order->update_status('on-hold');
                $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                $order->save();
                $this->meshulamApprovePayment($order);
                $this->meshulamJ5Responseimmediate($order);
                //mark order as completed after apple payment
                delete_post_meta($order_id, 'apple_transaction_status');
                $redirect_url = isset($this->thank_you_page) && !empty($this->thank_you_page) ? $this->thank_you_page : $order->get_checkout_order_received_url();
                wp_redirect($redirect_url);
            } else {
                delete_post_meta($order_id, 'apple_transaction_status');
                if (isset($this->fail_url) && !empty($this->fail_url)) {
                    wp_redirect($this->fail_url);
                } else {
                    wp_redirect($order->get_cancel_order_url());
                }
            }
        } else {
            $redirect_url = isset($this->thank_you_page) && !empty($this->thank_you_page) ? $this->thank_you_page : $order->get_checkout_order_received_url();
            wp_redirect($redirect_url);
        }
        exit;
    }

    //apple server response direct j4 execute without j5
    public function apple_server_response_direct_j4execute()
    {
        if (!empty($_POST)) {
            $logger = wc_get_logger();
            $logger->add('apple_notify_response_direct_j4', 'WP Remote Post Response: ' . print_r($_POST, true));
            if ($_POST['status'] == '1' && isset($_POST['data']['customFields']['cField1'])) {
                $order_id = $_POST['data']['customFields']['cField1'];
                $order = wc_get_order($order_id);
                $status = $order->get_status();
                if ($status == 'pending' || $status == 'on-hold') {
                    $tr_id = get_post_meta($order_id, 'applepay_transaction_id', true);
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                    $transactionId = $_POST['data']['transactionId'];
                    $transactionToken = $_POST['data']['transactionToken'];
                    delete_post_meta($order->get_id(), 'approved_transactionId');
                    delete_post_meta($order->get_id(), 'approved_transactionToken');
                    update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
                    update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
                    update_post_meta($order_id, 'order_already_passed', '1');
                    $asmachta = $_POST['data']['asmachta'];
                    update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);
                    $order->update_status($this->order_status);
                    $order->payment_complete($asmachta);
                    $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $tr_id));
                    $this->meshulam_approveTransaction($_POST['data']);
                }
                exit;
            }
        }
        exit;
    }

    //after getting server response in direct j4 we need to approve that transaction
    public function meshulam_approveTransaction($response)
    {
        if (!empty($response)) {
            $logger = wc_get_logger();
            $order_id = $response['customFields']['cField1'];
            $order = wc_get_order($order_id);
            $args_body = [
                'pageCode' => $this->pagecode,
                'transactionId' => $response['transactionId'],
                'transactionToken' => $response['transactionToken'],
                'transactionTypeId' => $response['transactionTypeId'],
                'paymentType' => $response['paymentType'],
                'sum' => $response['sum'],
                'firstPaymentSum' => $response['firstPaymentSum'],
                'periodicalPaymentSum' => $response['periodicalPaymentSum'],
                'paymentsNum' => $response['paymentsNum'],
                'allPaymentsNum' => $response['allPaymentsNum'],
                'paymentDate' => $response['paymentDate'],
                'asmachta' => $response['asmachta'],
                'fullName' => $response['fullName'],
                'payerPhone' => $response['payerPhone'],
                'payerEmail' => $response['payerEmail'],
                'cardSuffix' => $response['cardSuffix'],
                'cardType' => $response['cardType'],
                'cardTypeCode' => $response['cardTypeCode'],
                'cardBrand' => $response['cardBrand'],
                'cardBrandCode' => $response['cardBrandCode'],
                'cardExp' => $response['cardExp'],
                'processId' => $response['processId'],
                'processToken' => $response['processToken'],
            ];
            if ($this->debug == 'yes') {
                $logger->add('apple_approve_payment_direct_j4', 'Before Sending Data to Meshulam');
                $logger->add('apple_approve_payment_direct_j4', 'Request: ' . print_r($args_body, true));
            }
            $args = [
                'method' => 'POST',
                'timeout' => 45,
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'headers' => [],
                'body' => $args_body,
                'cookies' => [],
            ];
            $res = wp_remote_post($this->approveTransaction, $args);
            if (is_wp_error($res)) {
                if ($this->debug == 'yes') {
                    $logger->add('apple_approve_payment_direct_j4', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                }
            } else {
                if ($this->debug == 'yes') {
                    $logger->add('apple_approve_payment_direct_j4', 'WP Remote Post Completed');
                    $data = json_decode($res['body']);
                    $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    $logger->add('apple_approve_payment_direct_j4', 'WP Remote Post Response: ' . print_r($file_data, true));
                }
            }
        }
    }

    //apple server response
    public function apple_server_response()
    {
        // get apple response
        if (!empty($_POST)) {
            $logger = wc_get_logger();
            $logger->add('meshulam_notify_response', 'WP Remote Post Response: ' . print_r($_POST, true));
            if ($_POST['status'] == '1' && isset($_POST['data']['customFields']['cField1'])) {
                //if response is in success store data in db
                $order_id = $_POST['data']['customFields']['cField1'];
                $order = wc_get_order($order_id);
                $status = $order->get_status();
                $transactionId = $_POST['data']['transactionId'];
                $transactionToken = $_POST['data']['transactionToken'];
                delete_post_meta($order->get_id(), 'approved_transactionId');
                delete_post_meta($order->get_id(), 'approved_transactionToken');
                update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
                update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);

                if ($status == 'pending' || $status == 'on-hold') {
                    $tr_id = get_post_meta($order_id, 'applepay_transaction_id', true);
                    $order_status = $this->order_status;
                    if ($status != 'on-hold') {
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                        $order->update_status('on-hold');
                        $order->save();
                    }
                    $j5_mode = get_post_meta($order_id, 'meshulam_j5_on', true);
                    if ($j5_mode == 'yes') {
                        exit;
                    }
                    exit;
                }
            }
            exit;
        }
    }

    // check ipn response direct j4 execute without j5
    public function ipn_response_direct_j4execute()
    {
        if (!empty($_REQUEST)) {
            if ($this->debug == 'yes') {
                $logger = wc_get_logger();
                $logger->add('apple_ipn_direct_j4', 'New IPN Fired');
                $logger->add('apple_ipn_direct_j4', 'Result: ' . print_r($_REQUEST, true));
            }
            if (isset($_REQUEST['response']) && !empty(isset($_REQUEST['response']))) {
                $order_id = $_REQUEST['cField1'];
                global $woocommerce;
                $order = wc_get_order($order_id);
                if (!$order) {
                    if (isset($this->fail_url) && !empty($this->fail_url)) {
                        wp_redirect($this->fail_url);
                    } else {
                        wp_redirect($order->get_cancel_order_url());
                    }
                    return;
                }
                $status = $order->get_status();
                if ($status == 'processing' || $status == 'completed') {
                    $this->redirect_order_received($order_id);
                    exit;
                }
                if ($_REQUEST['response'] == 'success') {
                    $tr_id = get_post_meta($order_id, 'applepay_transaction_id', true);
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                    $woocommerce->cart->empty_cart();
                    update_post_meta($order_id, 'order_already_passed', '1');
                    $order->update_status($this->order_status);
                    $order->save();
                    $this->get_paymentprocessinfo_directj4($order);
                    return;
                } else if (isset($_REQUEST['json']) && isset($_REQUEST['cField1'])) {
                    $json = $_REQUEST['json'];
                    $input = base64_decode($json);
                    $j_input = json_decode($input, true);
                    $error_id = $j_input["err"]["id"];
                    $error_message = $j_input["err"]["message"];
                    $order->add_order_note(sprintf(__('Meshulam payment Response: %s', 'meshulam'), $error_message));
                    if ($error_id == '-81') {
                        $order->update_status('on-hold');
                        $woocommerce->cart->empty_cart();
                        $transaction_id = get_post_meta($_REQUEST['cField1'], 'applepay_transaction_id', true);
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $transaction_id));
                        $order->save();
                        $this->get_paymentprocessinfo_directj4($order);
                        return;
                    } elseif ('162' == $error_id && isset($j_input["data"]['new_payment_id'])) {

                        //2.2 Failure at the level of credit card  data -> open card data iframe again
                        $new_payment_id = $j_input["data"]['new_payment_id'];
                        update_post_meta($order->get_id(), 'applepay_transaction_id', $new_payment_id, true);
                        $redirect_url = $_REQUEST['data_url'];
                        ?>
						<script>
							let data = {
								iframeError : {
									message: '<?php echo $error_message; ?>'
								}
							};
							parent.postMessage(data,'*');
							document.location.href = '<?php echo $redirect_url; ?>';
						</script>
						<?php
exit;
                    } else {
                        if ($error_id == '-82') {
                            //failed transcation due to interruption by user
                            $msg = 'Failed due to interruption by user';
                            $order->add_meta_data('meshulam_payment_error', $msg, true);
                            $order->save();
                        } else {
                            $msg = $j_input["err"]["message"];
                            $order->add_meta_data('meshulam_payment_error', $msg, true);
                            $order->save();
                        }
                        if (!empty($this->fail_url) && $this->show_thank_you_detail == 'yes') {
                            die('<html><head><script>window.top.location.href = "' . $this->fail_url . '?order_error=failer&order_id=' . $order_id . '";</script></head></html>');
                        } else {
                            if ($order->has_status('failed')) {
                                // DISABLE ANY FUNCTION HOOKED TO "woocommerce_thankyou"
                                remove_all_actions('woocommerce_thankyou');
                            }
                            $redict_id = $_REQUEST['cField1'];
                            die('<html><head><script>window.top.location.href = "' . home_url() . '/order_fail_meshulam/' . $redict_id . '";</script></head></html>');
                        }
                        delete_post_meta($_REQUEST['cField1'], 'meshulam_pay_payment-order-custom');

                    }
                } else {
                    $this->redirect_order_received($order_id);
                }
            }

        } else {
            die('<p>אירעה שגיאה</p>');
        }
    }

    // check ipn response
    public function ipn_response()
    {
        if ($this->debug == 'yes') {
            $logger = wc_get_logger();
            $logger->add('apple_ipn', 'New IPN Fired');
            $logger->add('apple_ipn', 'Result: ' . print_r($_REQUEST, true));
        }
        $order_id = $_REQUEST['cField1'];
        global $woocommerce;
        $order = wc_get_order($order_id);
        $status = $order->get_status();
        if ($status == 'processing' || $status == 'completed' || $status == 'on-hold') {
            $this->redirect_order_received($order_id);
        }
        update_post_meta($order_id, 'apple_transaction_status', 1);
        if (isset($_REQUEST['response']) && !empty(isset($_REQUEST['response']))) {

            $order_id = $_REQUEST['cField1'];
            if (!$order) {
                if (isset($this->fail_url) && !empty($this->fail_url)) {
                    wp_redirect($this->fail_url);
                } else {
                    wp_redirect($order->get_cancel_order_url());
                }
                return;
            }
            $json = $_REQUEST['json'];
            $input = base64_decode($json);
            if ($_REQUEST['response'] == 'success') {
                $transaction_id = get_post_meta($_REQUEST['cField1'], 'applepay_transaction_id', true);
                $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $transaction_id));
                $order->update_status('on-hold');
                $woocommerce->cart->empty_cart();
                $order->save();
                $this->meshulamApprovePayment($order);
                $return_url = add_query_arg('wc-api', 'applepay_order_redirect', home_url('/'));
                $return_url = add_query_arg('order_id', $order_id, $return_url);
                echo '<html><head><script>window.top.location.href = "' . $return_url . '";</script></head></html>';
                die();
            } else if (isset($_REQUEST['json']) && isset($_REQUEST['cField1'])) {
                $json = $_REQUEST['json'];
                $input = base64_decode($json);
                $j_input = json_decode($input, true);
                $error_id = $j_input["err"]["id"];
                $error_message = $j_input["err"]["message"];
                $order->add_order_note(sprintf(__('Meshulam payment Response: %s', 'meshulam'), $error_message));
                if ($error_id == '-81') {
                    $transaction_id = get_post_meta($_REQUEST['cField1'], 'meshulam_transaction_id', true);
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $transaction_id));
                    $order->update_status('on-hold');
                    $woocommerce->cart->empty_cart();
                    $order->save();
                    $this->meshulamApprovePayment($order);
                    $return_url = add_query_arg('wc-api', 'applepay_order_redirect', home_url('/'));
                    $return_url = add_query_arg('order_id', $order_id, $return_url);
                    echo '<html><head><script>window.top.location.href = "' . $return_url . '";</script></head></html>';
                    die();
                } elseif ('162' == $error_id && isset($j_input["data"]['new_payment_id'])) {

                    //2.2 Failure at the level of credit card  data -> open card data iframe again
                    $new_payment_id = $j_input["data"]['new_payment_id'];
                    update_post_meta($order->get_id(), 'meshulam_transaction_id', $new_payment_id, true);
                    $redirect_url = $_REQUEST['data_url'];
                    ?>
					<script>
						let data = {
							iframeError : {
								message: '<?php echo $error_message; ?>'
							}
						};
						parent.postMessage(data,'*');
						document.location.href = '<?php echo $redirect_url; ?>';
					</script>
					<?php
exit;
                } else {
                    if ($error_id == '-82') {
                        //failed transcation due to interruption by user
                        $msg = 'Failed due to interruption by user';
                        $order->add_meta_data('meshulam_payment_error', $msg, true);
                        $order->save();
                    } else {
                        $msg = $j_input["err"]["message"];
                        $order->add_meta_data('meshulam_payment_error', $msg, true);
                        $order->save();
                    }
                    if (!empty($this->fail_url) && $this->show_thank_you_detail == 'yes') {
                        die('<html><head><script>window.top.location.href = "' . $this->fail_url . '?order_error=failer&order_id=' . $order_id . '";</script></head></html>');
                    } else {
                        if ($order->has_status('failed')) {
                            // DISABLE ANY FUNCTION HOOKED TO "woocommerce_thankyou"
                            remove_all_actions('woocommerce_thankyou');
                        }
                        $redict_id = $_REQUEST['cField1'];
                        die('<html><head><script>window.top.location.href = "' . home_url() . '/order_fail_meshulam/' . $redict_id . '";</script></head></html>');
                    }
                    delete_post_meta($_REQUEST['cField1'], 'meshulam_pay_payment-order-custom');

                }
            } else {
                $this->redirect_order_received($order_id);
            }

        } else {
            if (isset($_REQUEST['response']) && !empty($_REQUEST['response']) && $_REQUEST['response'] == 'success') {
                die('<html><head><script>window.top.location.href = "' . $_REQUEST['cField1'] . '"</script></head></html>');
            } else {
                die('<p>אירעה שגיאה</p>');
            }
        }
        delete_post_meta($order_id, 'meshulam_pay_payment-order-custom');

    }

    public function get_paymentprocessinfo_directj4(WC_Order $order)
    {
        if ($this->debug == 'yes') {
            $logger = wc_get_logger();
        }
        $order_id = $order->get_id();
        $processToken = unserialize(get_post_meta($order->get_id(), 'applepay_card_token_detail', true));
        $processId = get_post_meta($order->get_id(), 'bitpay_transaction_id', true);
        $pay_sum = $order->get_total();
        $pagecode = $this->pagecode;
        $args_body = [
            'pageCode' => $pagecode,
            'processToken' => $processToken,
            'processId' => $processId,
        ];
        if ($this->debug == 'yes') {
            $logger->add('apple_get_payment_process_info_direct_j4', 'Before Sending Data to Meshulam');
            $logger->add('apple_get_payment_process_info_direct_j4', 'Request: ' . print_r($args_body, true));
        }
        $args = [
            'method' => 'POST',
            'timeout' => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'headers' => [],
            'body' => $args_body,
            'cookies' => [],
        ];
        $res = wp_remote_post($this->getPaymentProcessInfo_url, $args);
        if (is_wp_error($res)) {
            if ($this->debug == 'yes') {
                $logger->add('apple_get_payment_process_info_direct_j4', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $logger->add('apple_get_payment_process_info_direct_j4', 'WP Remote Post Completed');
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('apple_get_payment_process_info_direct_j4', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
        }
        $body = json_decode($res['body'], true);
        if ($body['status'] == '1') {
            $body['data']['transactions'][0]['customFields']['cField1'] = $order_id;
            $this->meshulam_approveTransaction($body['data']['transactions'][0]);
            $transactionId = $body['data']['transactions'][0]['transactionId'];
            $transactionToken = $body['data']['transactions'][0]['transactionToken'];
            $asmachta = $body['data']['transactions'][0]['asmachta'];
            delete_post_meta($order->get_id(), 'approved_transactionId');
            delete_post_meta($order->get_id(), 'approved_transactionToken');
            update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
            update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
            update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);
            $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $transactionId));
        }
        $this->redirect_order_received($order->get_id());
        exit;
    }

    public function meshulamApprovePayment(WC_Order $order)
    {

        if ($this->debug == 'yes') {
            $logger = wc_get_logger();
        }
        $order_id = $order->get_id();
        $processToken = unserialize(get_post_meta($order->get_id(), 'applepay_card_token_detail', true));
        $processId = get_post_meta($order->get_id(), 'applepay_transaction_id', true);
        $pay_sum = $order->get_total();
        //Get transaction id and token from get payment process info API
        //getPaymentProcessInfo_url
        $args_body = [
            'pageCode' => $this->pagecode,
            'processToken' => $processToken,
            'processId' => $processId,
        ];
        if ($this->debug == 'yes') {
            $logger->add('apple_before_approve_payment', 'WP Remote Post Request: ' . print_r($args_body, true));
        }
        $args = [
            'method' => 'POST',
            'timeout' => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'headers' => [],
            'body' => $args_body,
            'cookies' => [],
        ];
        $res = wp_remote_post($this->getPaymentProcessInfo_url, $args);
        if (is_wp_error($res)) {
            if ($this->debug == 'yes') {
                $logger->add('apple_before_approve_payment', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $logger->add('apple_before_approve_payment', 'WP Remote Post Completed');
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('apple_before_approve_payment', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
        }
        $body = json_decode($res['body'], true);
        if ($body['status'] == '1') {
            $api_status = $body['data']['transactions'][0]['status'];
            $transactionId = $body['data']['transactions'][0]['transactionId'];
            $transactionToken = $body['data']['transactions'][0]['transactionToken'];
            update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
            update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
            $paymentSum = $body['data']['transactions'][0]['sum'];
            $args = array($order_id);
            wp_schedule_single_event(time() + 300, 'meshulam_cron_paymentinfo_sixty_sec', $args);
            wp_schedule_single_event(time() + 960, 'meshulam_cron_paymentinfo_sixty_sec', $args);
            wp_schedule_single_event(time() + 3360, 'meshulam_cron_paymentinfo_sixty_sec', $args);
        }
        $this->redirect_order_received($order->get_id());
    }

    /**
     * @return bool|void
     */
    public function meshulam_add_file_ApplePay()
    {

        $isenabled = $this->get_option('enabled');

        if( $isenabled ){

            $sourceFile = MESHULAM_SRC_FILE_APPLE . '/' . MESHULAM_APPLE_FILE;
            $destinationFile = MESHULAM_DEST_FILE_APPLE . '/' . MESHULAM_APPLE_FILE;

            if (!file_exists($destinationFile)) {
                if (file_exists($sourceFile)) {
                    if (!is_dir(MESHULAM_DEST_FILE_APPLE)) {
                        wp_mkdir_p(MESHULAM_DEST_FILE_APPLE);
                        chmod(MESHULAM_DEST_FILE_APPLE, 0777);
                    }
                    if (!file_exists($destinationFile)) {
                        if (copy($sourceFile, $destinationFile)) {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }

}
