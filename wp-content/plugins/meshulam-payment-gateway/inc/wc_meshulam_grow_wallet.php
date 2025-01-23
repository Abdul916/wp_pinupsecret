<?php
defined('ABSPATH') || exit; // Exit if accessed directly

#[\AllowDynamicProperties]
class WC_Grow_Wallet_Gateway extends WC_Payment_Gateway_CC
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
        $update_url,
        $thank_you_page,
        $fail_url,
        $order_status,
        $payments_list_options,
        $available_payments,
        $meshulam_j5_status,
        $sdk_credit_card,
        $sdk_bit,
        $sdk_apple,
        $sdk_google,
        $pagecode,
        $recurring_pagecode,
        $invoiceNotifyUrl,
        $payment_url_withtoken,
        $refund_mode,
        $j5_mode,
        $chargeType,
        $account_details,
        $new_payment_url,
        $j5_approve_url,$refund_url,$approveTransaction,
        $id, $icon, $has_fields, $method_title, $method_description, $supports;

    public function __construct()
    {

        global $pagenow;

        // class setup
        $this->id = 'grow-wallet-payment';
        $this->icon = MESHULAM_PLUGIN_URL . 'assets/images/paymenticons.png';
        $this->has_fields = true;
        $this->method_title = __('grow wallet payment gateway', 'meshulam');
        $this->method_description = __('Pay securely with grow wallet payment gateway', 'meshulam');
        $this->supports = [
            'products',
        ];

        // load assets
        add_action('admin_enqueue_scripts', [$this, 'load_admin_assets']);

        //define env variables
        $this->api_test_mode = $this->get_option('api_test_mode');

        $this->debug = $this->get_option('debug');
        $meshulam_refund_status = get_option('meshulam_refund_status');
        $this->refund_mode = $this->get_option('refund_mode');
        $meshulam_j5_status = get_option('meshulam_j5_status');
        $this->payments_list_options = !empty($this->get_option('available_payment_list')) ? $this->get_option('available_payment_list') : [];

        $meshulam_force_regular_payment = get_option('meshulam_force_regular_payment');
        if ($meshulam_j5_status != '1') {
            $this->update_option('j5_mode', '');
        }
        if ($meshulam_refund_status == '1') {
            if ($this->refund_mode == 'yes') {
                $this->supports = [
                    'products',
                    'refunds',
                ];
            }
        } else {
            $this->update_option('refund_mode', '');
        }

        $this->sdk_credit_card = get_option('sdk_credit_card');
        $this->sdk_bit = get_option('sdk_bit');
        $this->sdk_apple = get_option('sdk_apple');
        $this->sdk_google = get_option('sdk_google');

        $this->available_payments = [];
        if (get_option('meshulam_bit_payment_status') == '1' && in_array('credit', $this->payments_list_options)) {
            array_push($this->available_payments, "credit");
        }
        if (get_option('bitpay_payment_status') == '1' && in_array('bit', $this->payments_list_options)) {
            array_push($this->available_payments, "bit");
        }
        if (get_option('meshulam_apple_payment_status') == '1' && in_array('apple', $this->payments_list_options)) {
            array_push($this->available_payments, "apple");
        }
        if (get_option('meshulam_cal_payment_status') == '1' && in_array('cal', $this->payments_list_options)) {
            array_push($this->available_payments, "cal");
        }
        if (get_option('meshulam_googlepay_payment_status') == '1' && in_array('google', $this->payments_list_options)) {
            array_push($this->available_payments, "google");
        }
        $this->j5_mode = $this->get_option('j5_mode');
        $this->refund_mode = $this->get_option('refund_mode');
        // define user set variables
        $meshulam_popup = $this->get_option('meshulam_popup_show');
        if ($meshulam_popup == '') {
            $this->update_option('meshulam_popup_show', 'yes');
        }
        $this->title = $this->get_option('title');

        if ('post.php' === $pagenow && isset($_GET['post']) && 'shop_order' === get_post_type($_GET['post'])) {
            $order = wc_get_order($_GET['post']);
            $wallet_payment_title = get_post_meta($order->get_id(), 'wallet_payment_title', true);
            if ($wallet_payment_title) {
                $this->title = $wallet_payment_title;
            }
        }

        $this->description = $this->get_option('description');
        $this->auth_code = $this->api_test_mode == 'yes' ? '305a9a777e42' : 'ae67b1668109';
        //$this->pageCode = $this->api_test_mode == 'yes' ? '81e04dc34850' : '81e04dc34850';
        $this->api_userid = get_option('meshulam_bit_payment_code') && $this->api_test_mode != 'yes' ? get_option('meshulam_bit_payment_code') : 'e1ee96ba76032485';
        $this->order_status = $this->get_option('order_status') ? str_replace('wc-', '', $this->get_option('order_status')) : 'processing';
        if ($this->j5_mode == 'yes') {
            $this->order_status = 'processing';
        }
        $this->chargeType = ($this->j5_mode != 'yes') ? '1' : '2';
        $this->account_details = get_option(
            'account_details',
            array(
                array(
                    'greater_then' => $this->get_option('greater_then'),
                    'less_then' => $this->get_option('less_then'),
                    'max_payments' => $this->get_option('max_payments'),
                ),
            )
        );
        // define thank & fail urls
        $this->thank_you_page = $this->get_option('thank_you_page') ? $this->get_option('thank_you_page') : '';
        $this->fail_url = $this->get_option('fail_url') ? $this->get_option('fail_url') : '';

        // define url variables
        $this->payment_url_withtoken = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/createTransactionWithToken/' : 'https://secure.meshulam.co.il/api/light/server/1.0/createTransactionWithToken';
        $this->new_payment_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/createPaymentProcess' : 'https://secure.meshulam.co.il/api/light/server/1.0/createPaymentProcess';
        $this->j5_approve_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/settleSuspendedTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/settleSuspendedTransaction';
        $this->getPaymentProcessInfo_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/getPaymentProcessInfo' : 'https://secure.meshulam.co.il/api/light/server/1.0/getPaymentProcessInfo';
        $this->refund_url = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/refundTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/refundTransaction';
        $this->approveTransaction = $this->api_test_mode == 'yes' ? 'https://sandbox.meshulam.co.il/api/light/server/1.0/approveTransaction' : 'https://secure.meshulam.co.il/api/light/server/1.0/approveTransaction';
        $this->invoiceNotifyUrl = add_query_arg('wc-api', 'meshulam_invoice_response', home_url('/'));
        $this->response_url = add_query_arg('wc-api', 'grow_wallet_gateway', home_url('/'));
        $this->update_url = add_query_arg('wc-api', 'grow_wallet_server_response', home_url('/'));
        $this->integromat_send_order_url = "https://hook.enterprise.eu1.integromat.celonis.com/u3ffa4tlwkvfmf36m8brci809jkhzru1";
        if ($this->j5_mode != 'yes') {
            $this->response_url = add_query_arg('wc-api', 'grow_wallet_gateway_direct_j4execute', home_url('/'));
            $this->update_url = add_query_arg('wc-api', 'grow_wallet_server_response_direct_j4execute', home_url('/'));
        }
        $this->pagecode = $this->api_test_mode == 'yes' ? get_option('meshulam_grow_wallet_test_pagecode') : get_option('meshulam_grow_wallet_live_pagecode');
        $this->recurring_pagecode = $this->api_test_mode == 'yes' ? get_option('meshulam_grow_wallet_recurring_test_pagecode') : get_option('meshulam_grow_wallet_recurring_live_pagecode');

        if( get_option('grow_wallet_payment_status') == 1 && $this->get_option('enabled') == ''){
            $this->update_option('enabled', 'yes');
        }

        $this->enabled = $this->get_option('enabled');
        $this->pay_title = $this->get_option('pay_title');
        $this->full_name = $this->get_option('full_name');
        $this->phone_payer = $this->get_option('phone_payer');
        $this->email_payer = $this->get_option('email_payer');
        $this->company_api_extra_details = $this->get_option('company_api_extra_details');
        $this->description_payer = $this->get_option('description_payer');
        $this->add_payment_note = $this->get_option('add_payment_note');
        $this->environment = $this->get_option('environment');
        $this->payment_type = $this->get_option('payment_type');

        if (get_option('meshulam_recurring_payment_status') == '') {
            if (is_array($this->payment_type)) {
                if (in_array("direct_debit_2", $this->payment_type)) {
                    $array = $this->payment_type;
                    if (($key = array_search("direct_debit_2", $array)) !== false) {
                        unset($array[$key]);
                    }
                    $this->update_option('payment_type', $array);
                }
            }
        }

        //$this->payment_type = $this->get_option('payment_type');
        $this->enblepayment = $this->get_option('enblepayment');
        $this->maxpayment = $this->get_option('maxpayment');
        $this->api_key = $this->get_option('api_key');
        $this->business_owner_code = $this->get_option('business_owner_code');
        $this->design_page_code = $this->get_option('design_page_code');
        $this->show_thank_you_detail = $this->get_option('show_thank_you_detail');
        // save admin options
        add_action('woocommerce_update_options_payment_gateways_' . $this->id, [$this, 'process_admin_options']);
        add_action('woocommerce_update_options_payment_gateways_' . $this->id, array($this, 'save_account_details'));
        // recipt page for iframe
        add_action('woocommerce_receipt_' . $this->id, [$this, 'receipt_page']);

        // handle ipn response
        add_action('woocommerce_api_grow_wallet_gateway', [$this, 'ipn_response']);
        // handle meshulam server response
        add_action('woocommerce_api_grow_wallet_server_response', [$this, 'meshulam_server_response']);

        // handle ipn response direct j4 execute without j5
        add_action('woocommerce_api_grow_wallet_gateway_direct_j4execute', [$this, 'ipn_response_direct_j4execute']);
        // handle meshulam server response direct j4 execute without j5
        add_action('woocommerce_api_grow_wallet_server_response_direct_j4execute', [$this, 'meshulam_server_response_direct_j4execute']);
        // add_filter( 'woocommerce_order_button_text',  [$this, 'change_checkout_button_text' ], 99, 2  );
        add_filter('woocommerce_available_payment_gateways', [$this, 'meshulam_available_payment_gateways'], 99, 2);
        add_filter('woocommerce_gateway_title', [$this, 'meshulam_grow_wallet_payment_gateway_title'], 101, 2);
        add_filter('wp_footer', [$this, 'grow_wallet_js_integrate']);

        //check j5 status on order complete
        add_action('woocommerce_order_status_changed', [$this, 'woocommerce_order_status_changed_meshulamj5'], 10, 4);
        add_action( 'admin_notices', [$this, 'meshulam_admin_notice'] );

        // load settings
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

    public function grow_wallet_js_integrate()
    {
        if ($this->api_test_mode == 'yes') {
            $environment = 'DEV';
        } else {
            $environment = 'PRODUCTION';
        }
        ?>
        <script>
            let redirect = "";
            (function() {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.async = true;
                s.src = "https://cdn.meshulam.co.il/sdk/gs.min.js";
                s.onload = configureGrowSdk; //replace with your callback function
                var x = document.getElementsByTagName("script")[0];
                x.parentNode.insertBefore(s, x);
            })();

            function configureGrowSdk() {

                let config = {
                    environment: "<?php echo $environment; ?>",
                    version: "1.0",
                    paymentTypes: <?php echo json_encode($this->available_payments); ?>,
                    events: {
                        onSuccess: (response) => {
                            if (redirect) {
                                window.location.replace(redirect);
                            }
                        },
                        onFailure: (response) => {
                            console.log("onFailure" + response);
                        },
                        onError: (response) => {
                            console.log("onError" + response);
                        },
                        onWalletChange: (response) => {
                            console.log("onWalletChange" + response);
                        },
                        onTimeout: (response) => {
                            console.log("onTimeout" + response);
                        }
                    }
                };

                growPayment.init(config);
            }
        </script>
        <?php
    }

    public function meshulam_grow_wallet_payment_gateway_title($title, $payment_id)
    {
        if ($payment_id === 'grow-wallet-payment' && !is_admin()) {
            $title = '';
        }
        return $title;
    }

    public function meshulam_available_payment_gateways($available_gateways)
    {
        if (!is_checkout()) {
            return $available_gateways;
        }
        // stop doing anything if we're not on checkout page.
        if (array_key_exists('grow-wallet-payment', $available_gateways)) {
            // Gateway ID for Paypal is 'paypal'. bitpay-payment
            $available_gateways['grow-wallet-payment']->order_button_text = $this->pay_title;
        }
        return $available_gateways;
    }

    public function change_checkout_button_text($button_text)
    {
        if ($this->pay_title != '') {
            return $this->pay_title;
        }
        return $button_text;
    }

    // load admin assets
    public function load_admin_assets()
    {
        wp_enqueue_script('wc-payplus-gateway-custom-admin', MESHULAM_PLUGIN_URL . '/assets/js/admin_meshulam_payment.js', ['jquery'], MESHULAM_VERSION, true);
    }

    public function redirect_order_received($order_id)
    {
        $order = wc_get_order($order_id);
        $redirect = $this->get_return_url($order);

        if (isset($_GET['response'])) :
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
        $meshulam_recurring_payment_status = get_option('meshulam_recurring_payment_status');
        if ($meshulam_recurring_payment_status == 1) {
            $payment_type_array = array(
                'direct_debit_2' => __('Recurring payment', 'meshulam-payment-gateway'),
                'payments_4' => __('Payments', 'meshulam-payment-gateway'),
            );
        } else {
            $payment_type_array = array(
                'payments_4' => __('Payments', 'meshulam-payment-gateway'),
            );
        }

        $meshulam_j5_status = get_option('meshulam_j5_status');
        if ($meshulam_j5_status != '1') {
            $j5_class = 'hide-input hide';
        } else {
            $j5_class = '';
        }
        $meshulam_refund_status = get_option('meshulam_refund_status');
        if ($meshulam_refund_status != '1') {
            $refund_j5_class = 'hide-input hide';
        } else {
            $refund_j5_class = '';
        }

        $this->payments_list_options = [];
        if (get_option('meshulam_bit_payment_status') == '1') {
            array_push($this->payments_list_options, array("credit" => __('Credit Card', 'meshulam-payment-gateway')));
        }
        if (get_option('bitpay_payment_status') == '1') {
            array_push($this->payments_list_options, array("bit" => __('Bit', 'meshulam-payment-gateway')));
        }
        if (get_option('meshulam_apple_payment_status') == '1') {
            array_push($this->payments_list_options, array("apple" => __('Apple', 'meshulam-payment-gateway')));
        }
        if (get_option('meshulam_cal_payment_status') == '1') {
            array_push($this->payments_list_options, array("cal" => __('CAL', 'meshulam-payment-gateway')));
        }
        if (get_option('meshulam_googlepay_payment_status') == '1') {
            array_push($this->payments_list_options, array("google" => __('Google', 'meshulam-payment-gateway')));
        }

        $payment_list_options = array_reduce($this->payments_list_options, 'array_merge', array());

        $this->form_fields = array(
            'enabled' => array(
                'title' => __('Enable/Disable', 'meshulam-payment-gateway'),
                'label' => __('Enable grow wallet payment gateway', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'description' => '',
                'default' => 'yes',
            ),
            'title' => array(
                'title' => __('Title', 'meshulam-payment-gateway'),
                'type' => 'text',
                'description' => __('This controls the title which the user sees during checkout.', 'meshulam-payment-gateway'),
                'default' => 'תשלום בכרטיס אשראי',
                'desc_tip' => true,
            ),
            'pay_title' => array(
                'title' => __('Text button', 'meshulam-payment-gateway'),
                'type' => 'text',
                'default' => 'המשך לרכישה',
            ),
            'description_payer' => array(
                'title' => __('Description', 'meshulam-payment-gateway'),
                'type' => 'textarea',
                'description' => __('The payment description', 'meshulam-payment-gateway'),
            ),
            'paymentsettings' => array(
                'title' => __('Payment settings:', 'meshulam-payment-gateway'),
                'type' => 'title',
            ),
            'order_status' => array(
                'title' => __('Order Status', 'meshulam-payment-gateway'),
                'type' => 'select',
                'options' => array(
                    'processing' => __('Processing', 'meshulam-payment-gateway'),
                    'completed' => __('Completed', 'meshulam-payment-gateway'),
                ),
                'default' => 'processing',
                'description' => __('Select order status after payment complete successfully', 'meshulam-payment-gateway'),
            ),
            'payment_type' => array(
                'title' => __('The payment type', 'meshulam-payment-gateway'),
                'type' => 'multiselect',
                'options' => $payment_type_array,
                'default' => '',
                'description' => __('', 'meshulam-payment-gateway'),
            ),

            'disable_coupon_rec_prd' => array(
                'title' => __('Disable Coupon', 'meshulam-payment-gateway'),
                'label' => __('Disable Coupon While Recurring Product', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'description' => '',
                'default' => 'no',
            ),

            /* 'available_payment_list' => array(
            'title' => __('Available payment List', 'meshulam-payment-gateway'),
            'type' => 'multiselect',
            'options' => $payment_list_options,
            'default' => '',
            'description' => __('', 'meshulam-payment-gateway'),
            ), */

            'maxpayment' => array(
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
            ),
            'account_details' => array(
                'type' => 'account_details',
            ),
            'api_test_mode' => array(
                'title' => __('Development Mode', 'meshulam-payment-gateway'),
                'type' => 'checkbox',
                'label' => __('Enable/Disable Test Mode', 'meshulam-payment-gateway'),
            ),
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
            'debug' => array(
                'title' => __('Debug log', 'woocommerce'),
                'type' => 'checkbox',
                'label' => __('Enable logging', 'woocommerce'),
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
        );
    }

    public function generate_account_details_html()
    {
        ob_start();
        ?>
        <tr valign="top" class="meshulam_acc">
            <th scope="row" class="titledesc"><?php esc_html_e('Payments range', 'meshulam-payment-gateway'); ?></th>
            <td class="forminp" id="bacs_accounts">
                <div class="wc_input_table_wrapper">
                    <p><?php esc_html_e('If the amount of buy', 'meshulam-payment-gateway'); ?></p>
                    <table class="widefat wc_input_table sortable" cellspacing="0">
                        <thead>
                            <tr>
                                <th class="sort">&nbsp;</th>
                                <th><?php esc_html_e('Greater then:', 'meshulam-payment-gateway'); ?></th>
                                <th><?php esc_html_e('Smaller then:', 'meshulam-payment-gateway'); ?></th>
                                <th><?php esc_html_e('Max payments', 'meshulam-payment-gateway'); ?></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="accounts">
                            <?php
                            $i = -1;
                            if ($this->account_details) {
                                foreach ($this->account_details as $account) {
                                    if (!empty(wp_unslash($account['greater_then']))) {
                                        echo '<tr class="account">
									<td class="sort"></td>
									<td><input type="text" value="' . esc_attr(wp_unslash($account['greater_then'])) . '" name="greater_then[' . esc_attr($i) . ']" autocomplete="false"/></td>
									<td><input type="text" value="' . esc_attr($account['less_then']) . '" name="less_then[' . esc_attr($i) . ']" autocomplete="false"/></td>
									<td><input type="number" class="max_payments" value="' . esc_attr(wp_unslash($account['max_payments'])) . '" name="max_payments[' . esc_attr($i) . ']" autocomplete="false"/></td>
									</tr>';
                                        $i++;
                                    }
                                }
                            }
                            ?>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="7"><a href="#" class="add button"><?php esc_html_e('+ Add More', 'meshulam-payment-gateway'); ?></a>
                                    <a href="#" class="remove_rows button"><?php esc_html_e('Delete', 'meshulam-payment-gateway'); ?></a>
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
                            jQuery('#woocommerce_meshulam-payment_payment_type :selected').each(function(i) {
                                if (jQuery(this).val() == 'payments_4') {
                                    max = jQuery('#woocommerce_meshulam-payment_maxpayment').val();
                                }
                            });


                            jQuery('<tr class="account">\
							<td class="sort"></td>\
							<td><input type="text" name="greater_then[' + size + ']" autocomplete="false"/></td>\
							<td><input type="text" name="less_then[' + size + ']" autocomplete="false"/></td>\
							<td><input type="number" class="max_payments" name="max_payments[' + size + ']" autocomplete="false"/></td>\
							</tr>').appendTo('#bacs_accounts table tbody');

                            if (max > 0) {
                                jQuery(".max_payments").attr({
                                    "max": max
                                });
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
        if (isset($_POST['greater_then']) && isset($_POST['less_then']) && isset($_POST['max_payments'])) {
            $greater_then = wc_clean(wp_unslash($_POST['greater_then']));
            $less_then = wc_clean(wp_unslash($_POST['less_then']));
            $max_payments = wc_clean(wp_unslash($_POST['max_payments']));
            foreach ($greater_then as $i => $name) {
                if (empty($greater_then[$i])) {
                    continue;
                }
                $accounts[] = array(
                    'greater_then' => $greater_then[$i],
                    'less_then' => $less_then[$i],
                    'max_payments' => $max_payments[$i],
                );
            }
        }
        // phpcs:enable
        update_option('account_details', $accounts);
    }

    // custom option page html
    public function admin_options()
    {
        $title = __('grow wallet payment gateway', 'meshulam-payment-gateway');
        $description = __('Pay securely with grow wallet payment gateway', 'meshulam-payment-gateway');
        $credit = __('Developed by <a href="https://codeandcore.co.il/">Code&Core</a>', 'meshulam-payment-gateway');
        ob_start();
        $this->generate_settings_html();
        $settings = ob_get_clean();

        echo "<div id='Meshulam-options'>
        <h1>$title</h1>
        <p>$description</p>
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

        //add action for popup ajax
        echo '<input type="hidden" name="action" value="meshulam_ajax_order">';
        if ($this->enabled) {
            do_action('woocommerce_credit_card_form_start', $this->id);
            if ($this->description_payer) {
                echo '<p>' . $this->description_payer . '</p>';
            }
            if (empty($this->payment_type)) {
                echo '<input type="hidden" name="meshulam_pay_exp_type" value="2">';
            } else {
                /* number of type payment active */
                if (is_array($this->payment_type)) {
                    $type_num = count($this->payment_type);
                } else {
                    $type_num = 1;
                }
                $product_id = array();
                global $woocommerce;
                global $wp;
                global $order_id;
                if (isset($_GET['key'])) {
                    $order_id = $wp->query_vars['order-pay'];
                }
                if (!empty($order_id)) {
                    $order = new WC_Order($order_id);
                    $items = $order->get_items();
                    foreach ($items as $item) {
                        $product_id[] = $item['product_id'];
                    }
                } else {
                    foreach (WC()->cart->get_cart() as $cart_item) {
                        $product_id[] = $cart_item['product_id'];
                    }
                }
                $hide_multiple_payments = false;
                foreach ($product_id as $id) {
                    $num_pay = get_post_meta($product_id[0], '_meshulam_pay_field', true) || 0;
                    $num_unlim = get_post_meta($product_id[0], '_meshulam_checkbox_field', true);
                    if ($num_pay > 0 || 'yes' == $num_unlim) {
                        $hide_multiple_payments = true;
                    }
                }
                $installment_no = get_post_meta($product_id[0], '_meshulam_pay_field', true);
                $installment_unlimited = get_post_meta($product_id[0], '_meshulam_checkbox_field', true);
                if ($installment_unlimited == 'yes') {
                    $installment_no = 180;
                }
                echo '<fieldset id="wc-' . esc_attr($this->id) . '-cc-form" class="wc-payment-form wc-meshulam-payment-form" style="background:transparent; display:none">';
                ?>
                <div class="form-row form-row-radio">
                    <?php
                    if ($this->payment_type == 'payments_4' && !$hide_multiple_payments) {
                        $pay_id = 'payments_4';
                    ?>
                        <input type="radio" name="meshulam_pay_exp_type" class="meshulam_pay_exp_type" id="meshulam_pay_expmonth_<?php echo $pay_id; ?>" value="4" checked="checked">
                        <label for="meshulam_pay_expmonth_<?php echo $pay_id; ?>">
                            <span class="required"></span>
                            <?php _e('Payments', 'meshulam-payment-gateway'); ?>
                        </label>
                        <?php
                    } else {
                        $enable_default_payment_type = true;
                        foreach ($this->payment_type as $pay_id) {
                            if ($pay_id == 'direct_debit_2' && $hide_multiple_payments) {
                                $enable_default_payment_type = false;
                        ?>
                                <input type="radio" name="meshulam_pay_exp_type" class="meshulam_pay_exp_type" id="meshulam_pay_expmonth_<?php echo $pay_id; ?>" value="1" checked="checked">
                                <label for="meshulam_pay_expmonth_<?php echo $pay_id; ?>" class="direct_db">
                                    <span class="required"></span>
                                    <?php _e('Recurring payment', 'meshulam-payment-gateway'); ?>
                                </label>
                                <input type="hidden" id="meshulam_pay_exp_numpayment_debit" name="meshulam_pay_exp_numpayment_debit" value="<?php echo $installment_no; ?>">
                            <?php
                            } else if ($pay_id == 'payments_4' && !$hide_multiple_payments) {
                                $enable_default_payment_type = false;
                            ?>
                                <input type="radio" name="meshulam_pay_exp_type" class="meshulam_pay_exp_type" id="meshulam_pay_expmonth_<?php echo $pay_id; ?>" value="4">
                                <label for="meshulam_pay_expmonth_<?php echo $pay_id; ?>">
                                    <span class="required"></span>
                                    <?php _e('Payments', 'meshulam-payment-gateway'); ?>
                                </label>
                    <?php
                            }
                        }
                    }
                    ?>
                </div>
                <?php
                if ($this->payment_type == 'payments_4') {
                    $pay_id_c = 1;
                }
                global $woocommerce;
                $amount = number_format($woocommerce->cart->total, 2, '.', '');
                if (!$hide_multiple_payments && !$enable_default_payment_type) :
                ?>
                    <div class="form-row form-row-select meshulam_pay_payments <?php if ($type_num == 1 && in_array("payments_4", $this->payment_type)) {
                                                                                    echo 'active';
                                                                                } ?>">


                        <label for="meshulam_pay_exp_numpayment"><span class="required"></span></label>
                        <select id="meshulam_pay_numpayment" name="meshulam_pay_exp_numpayment" autocomplete="false">
                            <option value="1">1 (<?php _e('Regular', 'meshulam-payment-gateway'); ?>)</option>
                            <?php $loop = 'no';
                            $loop_start = true;
                            $i = 0;
                            if (!empty($this->account_details) && count($this->account_details) != 0) {
                                foreach ($this->account_details as $account) {
                                    if (!empty($account['less_then']) || !empty($account['greater_then'])) {
                                        $loop = 'yes';
                                        if (!empty($account['less_then'])) {
                                            $max_val = $account['less_then'];
                                        } else {
                                            $max_val = (float) 1000000;
                                        };
                                        if (!empty($account['greater_then'])) {
                                            $min_val = $account['greater_then'];
                                        } else {
                                            $min_val = (int) 0;
                                        };
                                        if (($min_val <= $amount) && ($amount <= $max_val)) {
                                            if ($loop_start == true) :
                                                $i = 1;
                                                for ($i = 2; $i <= $account['max_payments']; $i++) { ?>
                                                    <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                                    <?php }
                                                $loop_start = false;
                                            endif;
                                        }
                                    }
                                }
                            } else {
                                for ($i = 2; $i <= $this->maxpayment; $i++) { ?>
                                    <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                                <?php }
                            }
                            if ($loop == 'yes' && $i == 0) {
                                for ($i = 2; $i <= $this->maxpayment; $i++) { ?>
                                    <option value="<?php echo $i; ?>"><?php echo $i; ?></option>
                            <?php }
                            }
                            ?>
                        </select>
                    </div>
                <?php endif; ?>
                <?php
                echo '</fieldset>'; ?>
                <script>
                    function grow_walletcheckTextInPayment() {
                        var _text = jQuery('.payment_method_grow-wallet-payment .form-row-radio').text();
                        _text = _text.trim();
                        if (_text == '' || !_text || _text == undefined) {
                            jQuery('.payment_box.payment_method_grow-wallet-payment').remove()
                        }
                    }
                    jQuery(document).ready(function() {
                        <?php if ($enable_default_payment_type) : ?>
                            jQuery('<input type="hidden" name="meshulam_pay_exp_type" value="2">').attr('type', 'hidden').appendTo(
                                'form.checkout');
                        <?php endif; ?>
                        grow_walletcheckTextInPayment();
                        jQuery('#meshulam_pay_expmonth_direct_debit_2').prop("checked", true);
                        if (jQuery('.form-row.form-row-select.meshulam_pay_debit.hide_debit_drop.active').length == 0) {
                            jQuery('.payment_method_grow-wallet-payment #meshulam_pay_expmonth_payments_4').prop("checked", true);
                            jQuery('.payment_method_grow-wallet-payment .meshulam_pay_payments').addClass('active');
                        }
                        jQuery(document).on('change', '.payment_method_grow-wallet-payment .meshulam_pay_exp_type', function() {
                            if (jQuery(this).is(':checked')) {
                                if (jQuery(this).val() == 4) {
                                    jQuery('.payment_method_grow-wallet-payment .meshulam_pay_payments').addClass('active');
                                }
                            }
                        });
                    });
                </script>
            <?php
            }
            ?>
            <script>
                jQuery(document).ready(function() {
                    if (jQuery('.payment_box.payment_method_grow-wallet-payment').children('p').length > 0 || jQuery(
                            '.payment_box.payment_method_grow-wallet-payment').children('fieldset').length > 0 || jQuery(
                            '#meshulam_pay_expmonth_6').length > 0) {
                        jQuery('.payment_box.payment_method_grow-wallet-payment').removeClass('hide_box');
                    } else {
                        jQuery('.payment_box.payment_method_grow-wallet-payment').addClass('hide_box');
                    }
                })
            </script>
            <?php
            do_action('woocommerce_credit_card_form_end', $this->id);
        }
    }

    public function validate_fields()
    {
        global $woocommerce;

        /*  if (empty($_POST['meshulam_pay_exp_type'])) {
        wc_add_notice(__('Please Select Payment Type', 'meshulam-payment-gateway'), 'error');
        }
        if (empty($_POST['meshulam_pay_exp_numpayment']) && isset($_POST['meshulam_pay_exp_numpayment']) && $_POST['meshulam_pay_exp_type'] == 4) {
        wc_add_notice(__('Number of payment is required!', 'meshulam-payment-gateway'), 'error');
        }
        if (empty($_POST['meshulam_pay_exp_numpayment_debit']) && isset($_POST['meshulam_pay_exp_numpayment_debit']) && $_POST['meshulam_pay_exp_type'] == 1) {
        wc_add_notice(__('Number of payment is required!', 'meshulam-payment-gateway'), 'error');
        } */

        if (isset($_POST['billing_phone'])) {
            $pattern = '/^(050|051|052|053|054|055|057|058)-?\d{7}$/';
            $valid_number = str_replace('-', '', $_POST['billing_phone']);
            if (!preg_match($pattern, $valid_number) || !is_numeric($_POST['billing_phone'])) {
                wc_add_notice(__('נא להזין מספר סלולרי בלבד עד 10 ספרות ללא רוווחים או סימנים מיוחדים', 'meshulam-payment-gateway'), 'error');
            }
        }
        return true;
    }

    // redirect to receipt page (payment page)
    public function process_payment($order_id)
    {
        $order = wc_get_order($order_id);
        $redirect_to = $order->get_checkout_payment_url(true);
        $exp_type = serialize($_POST['meshulam_pay_exp_type']);
        if (isset($_POST['meshulam_pay_exp_numpayment'])) {
            $exp_numpayment = serialize($_POST['meshulam_pay_exp_numpayment']);
        } else {
            $exp_numpayment = '';
        }
        if ($_POST['meshulam_pay_exp_type'] == 1) {
            $exp_numpayment = serialize($_POST['meshulam_pay_exp_numpayment_debit']);
        }
        $order->add_meta_data('meshulam_pay_payment-type', $exp_type, true);
        $order->add_meta_data('meshulam_pay_payment-number', $exp_numpayment, true);
        $order->save();
        return array(
            'result' => 'success',
            'redirect' => $redirect_to,
        );
    }

    // receipt page - iframe or redirect
    public function receipt_page($order_id)
    {
        $order = wc_get_order($order_id);
        //check order already paid or not before iframe
        $token = unserialize(get_post_meta($order_id, 'meshulam_card_token_detail', true));
        $transaction_id = get_post_meta($order_id, 'meshulam_transaction_id', true);

        //if order already completed
        $status = $order->get_status();
        if ($status == 'processing' || $status == 'completed') {
            $this->redirect_order_received($order_id);
        }

        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        $recuring_type = 0;
        foreach ($order->get_items() as $item_id => $item) {
            $product_id = $item->get_product_id();
            $installment_no = get_post_meta($product_id, '_meshulam_pay_field', true);
            $installment_unlimited = get_post_meta($product_id, '_meshulam_checkbox_field', true);
            if ($installment_no > 0 || $installment_unlimited == 'yes') {
                $recuring_type = 1;
            }
        }
        if ($recuring_type == '1') {
            $text_pay_type = 'הוראת קבע ';
            $text_pay_type_en = 'Recurring';
        } else if ($pay_type == '4') {
            $text_pay_type = 'תשלומים';
            $text_pay_type_en = 'Multiple Payments';
        } else {
            $text_pay_type = 'רגיל';
            $text_pay_type_en = 'Regular';
        }
        $pay_num = unserialize($order->get_meta('meshulam_pay_payment-number'));
        //below code for add payment type and number for multi payment on ul li
        $lang = get_bloginfo('language');
        if ($lang == 'en-US') {
            echo '
				<script>
				jQuery(".order_details").append("<li class=method>Form of payment:		<strong>' . __($text_pay_type_en, 'meshulam-payment-gateway') . '</strong></li>';
            if ($pay_num > 0) {
                echo '<li class=method>Number of payments:		<strong>' . $pay_num . '</strong></li>';
            }
            echo '");</script>
				';
        } else {
            echo '
				<script>
				jQuery(".order_details").append("<li class=method>סוג תשלום:		<strong>' . __($text_pay_type, 'meshulam-payment-gateway') . '</strong></li>';
            if ($pay_num > 0) {
                echo '<li class=method>מספר תשלומים:		<strong>' . $pay_num . '</strong></li>';
            }
            echo '");</script>
				';
        }
        //below code for if user back by browser page load automatic
        echo '<script>window.addEventListener( "pageshow", function ( event ) {
				var historyTraversal = event.persisted ||
				( typeof window.performance != "undefined" &&
				window.performance.navigation.type === 2 );
				if ( historyTraversal ) {
					window.location.reload();
				}
			});</script>';
        // get order data
        $order = wc_get_order($order_id);
        //get payment type and pay_num which is use in doPaymentWithToken API
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        $pay_num = unserialize($order->get_meta('meshulam_pay_payment-number'));
        if (2 == $pay_type) {
            $pay_num = 1;
        } elseif (4 == $pay_type) {
            $pay_type = $pay_num == 1 ? 2 : 4;
        } else {
            $pay_num = 0;
        }

        $this->doPaymentWithNewAPI($order, $pay_type, $pay_num);
    }

    //call integromat for sending order data after payment
    public function integromat_send_meshulam_order_data($order_id)
    {
        $order = wc_get_order($order_id);
        $logger = wc_get_logger();
        $user_id = $order->get_user_id();
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

        $customer_note = array();
        foreach ($items as $item) {
            $item_total = $item->get_total();
            $item_quantity = $item->get_quantity();
            $customer_note[] = $item->get_name() . '[ כמות: ' . $item_quantity . ' | מחיר: ' . number_format($item_total, 2) . ']';
        }
        $customer_note = implode(',', $customer_note);
        $pay_num = unserialize($order->get_meta('meshulam_pay_payment-number'));
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        if ($pay_type == 1) {
            $pagecode = $this->recurring_pagecode;
        } //for recurring
        else {
            $pagecode = $this->pagecode;
        } // for simple
        if ($pay_num == '' || $pay_num == '0') {
            $pay_num = 1;
        }
        $shipping_charge = $order->get_total_shipping();
        $tax_total = $order->get_total_tax();
        //send it to API as a description
        $customer_note = 'תשלום עבור הזמנה:' . $order_id;
        $this->invoiceNotifyUrl = add_query_arg('order_id', $order_id, $this->invoiceNotifyUrl);
        $args_body = array(
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
        /* if ($pay_num != '180') {
            $args_body['paymentNum'] = $pay_num;
            } */

        $args_body['maxPaymentNum'] = $pay_num;

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

            $sub = strip_tags(wc_price($item->get_total()));
            if( $yith_discount ){
                $sub = strip_tags(wc_price($item->get_subtotal()));
            }

            $curr = get_woocommerce_currency_symbol($order->get_currency());
            $item_sum = str_replace($curr, '', $sub);
            $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

            $args_body['productData'][$i]['catalogNumber'] = $sku;
            $args_body['productData'][$i]['price'] = $item_sum;
            $args_body['productData'][$i]['itemDescription'] = $item->get_name();
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
        $res = wp_remote_post($this->integromat_send_order_url, $args);
    }

    //Call API with New API
    public function doPaymentWithNewAPI($order_id)
    {
        $order = wc_get_order($order_id);
        $token = unserialize(get_post_meta($order_id, 'meshulam_card_token_detail', true));
        $transaction_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        $pay_num = unserialize($order->get_meta('meshulam_pay_payment-number'));

        if ($pay_type == 1) {
            // for recurring
            $pagecode = $this->recurring_pagecode;
        } else {
            // for simple
            $pagecode = $this->pagecode;
        }

        $logger = wc_get_logger();
        $user_id = $order->get_user_id();
        $first_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
        //get all items from order
        $items = $order->get_items();
        $order_id = $order->get_id();
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

        update_post_meta($order_id, 'order_already_passed', '0');
        $customer_note = array();
        foreach ($items as $item) {
            $item_total = $item->get_total();
            $item_quantity = $item->get_quantity();
            $customer_note[] = $item->get_name() . '[ כמות: ' . $item_quantity . ' | מחיר: ' . number_format($item_total, 2) . ']';
        }
        $customer_note = implode(',', $customer_note);

        if ($pay_num == '' || $pay_num == '0') {
            $pay_num = 1;
        }
        $shipping_charge = $order->get_total_shipping();
        $tax_total = $order->get_total_tax();
        //send it to API as a description
        $customer_note = 'תשלום עבור הזמנה:' . $order_id;
        $this->invoiceNotifyUrl = add_query_arg('order_id', $order_id, $this->invoiceNotifyUrl);
        $args_body = array(
            'pageCode' => $pagecode,
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

        if ($this->sdk_credit_card == 1) {
            $args_body['transactionTypes[0]'] = 1;
        }

        if ($this->sdk_bit == 1) {
            $args_body['transactionTypes[1]'] = 6;
        }

        if ($this->sdk_apple == 1) {
            $args_body['transactionTypes[2]'] = 13;
        }

        if ($this->sdk_google == 1) {
            $args_body['transactionTypes[3]'] = 14;
        }

        /*   if ($pay_num != '180') {
            $args_body['paymentNum'] = $pay_num;
            } */

        $amount = number_format($order->get_total(), 2, '.', '');
        $maxPayment = 1;
        $loop_start = true;
        $i = 0;

        if (!empty($this->account_details) && count($this->account_details) != 0) {
            foreach ($this->account_details as $account) {
                if (!empty($account['less_then']) || !empty($account['greater_then'])) {

                    if (!empty($account['less_then'])) {
                        $max_val = $account['less_then'];
                    } else {
                        $max_val = (float) 1000000;
                    }
                    if (!empty($account['greater_then'])) {
                        $min_val = $account['greater_then'];
                    } else {
                        $min_val = (int) 0;
                    }
                    if (($min_val <= $amount) && ($amount <= $max_val)) {
                        if ($loop_start == true) :
                            $i = 1;
                            for ($i = 2; $i <= $account['max_payments']; $i++) {
                                $maxPayment = $i;
                            }
                        endif;
                    }
                }
            }
        } else {
            $maxPayment = $this->maxpayment;
        }

        if ($maxPayment == 0) {
            $maxPayment = 1;
        }

        $args_body['maxPaymentNum'] = $maxPayment;

        if ($maxPayment == 1) {
            $args_body['paymentNum'] = 1;
        }

        if ($pay_type == 1) {
            unset($args_body['maxPaymentNum']);
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

            $sub = strip_tags(wc_price($item->get_total()));
            $curr = get_woocommerce_currency_symbol($order->get_currency());
            $item_sum = str_replace($curr, '', $sub);
            $item_sum = preg_replace("/\s|&nbsp;|,/", '', $item_sum);

            $args_body['productData'][$i]['catalogNumber'] = $sku;
            $args_body['productData'][$i]['price'] = $item_sum;
            $args_body['productData'][$i]['itemDescription'] = $item->get_name();
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
        if ($this->debug == 'yes') {
            $logger->add('grow_wallet_process_payment_newapi', 'Before Sending Data to Meshulam');
            $logger->add('grow_wallet_process_payment_newapi', 'Request: ' . print_r($args_body, true));
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
        $res = wp_remote_post($this->new_payment_url, $args);
        if (is_wp_error($res)) {
            if ($this->debug == 'yes') {
                $logger->add('grow_wallet_process_payment_newapi', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('grow_wallet_process_payment_newapi', 'WP Remote Post Completed');
                $logger->add('grow_wallet_process_payment_newapi', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
            $meshulam_force_regular_payment = get_option('meshulam_force_regular_payment');
            if ($this->j5_mode != 'yes') {
                $args = array($order_id);
                wp_schedule_single_event(time() + 300, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
                wp_schedule_single_event(time() + 960, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
                wp_schedule_single_event(time() + 3360, 'meshulam_regularj4_cron_paymentinfo_sixty_sec', $args);
            }
            $token = $this->get_payment_page($res, $order);
            $response = ['token' => $token, 'thank_you_url' => $this->get_return_url($order)];
            echo json_encode($response);
            die();
        }
    }

    //Call API with doPaymentWithToken
    public function doPaymentWithToken($order, $pay_type, $pay_num)
    {
        if ($this->debug == 'yes') {
            $logger = wc_get_logger();
            $logger->add('grow_wallet_withtoken', 'New meshulam Payment Process Fired');
        }
        $user_id = $order->get_user_id();
        global $woocommerce;
        //if user logged in and generate orders second time than get cart token
        if (!empty($user_id)) {
            $card_token_key = get_user_meta($user_id, 'meshulam_pay_card_token_key', true);
        }
        $first_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
        //get all items from order
        $items = $order->get_items();
        $customer_note = array();
        foreach ($items as $item) {
            $item_total = $item->get_total();
            $item_quantity = $item->get_quantity();
            $customer_note[] = $item->get_name() . '[ כמות: ' . $item_quantity . ' | מחיר: ' . number_format($item_total, 2) . ']';
        }
        $customer_note = implode(',', $customer_note);
        $order_id = $order->get_id();
        //send it to API as a description
        $customer_note = $customer_note . ' משלוח:' . $order->get_shipping_method() . ' | מספר הזמנה:' . $order_id;
        $args_body = array(
            'api_key' => $this->auth_code,
            'user_id' => $this->api_userid,
            'card_token_key' => $card_token_key,
            'full_name' => $first_name,
            'phone' => $order->get_billing_phone(),
            'email' => $order->get_billing_email(),
            'sum' => $order->get_total(),
            'description' => $customer_note,
            'type_id' => $pay_type,
            'payment_num' => $pay_num,
        );
        if ($this->debug == 'yes') {
            $logger->add('grow_wallet_withtoken', 'Before Sending Data to Meshulam');
            $logger->add('grow_wallet_withtoken', 'Request: ' . print_r($args_body, true));
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
        $res = wp_remote_post($this->payment_url_withtoken, $args);
        if (is_wp_error($res)) {
            if ($this->debug == 'yes') {
                $logger->add('grow_wallet_withtoken', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $logger->add('grow_wallet_withtoken', 'WP Remote Post Completed');
                $logger->add('grow_wallet_withtoken', 'WP Remote Post Response: ' . print_r($res['body'], true));
            }
            $body = json_decode($res['body'], true);
            if ($body["status"] == 1) {
                $token_val = serialize($body["data"][0]["token"]);
                $payment_id = $body["data"][0]["id"];
                update_post_meta($order->id, 'meshulam_pay_card_token_detail', $token_val, true);
                update_post_meta($order->id, 'payment_transaction_id', $payment_id, true);
                $order_status_to = $this->order_status;
                $order->update_status($order_status_to);
                $order->reduce_order_stock();
                $woocommerce->cart->empty_cart();
                update_option('webhook_debug', $_REQUEST);
                if (!empty($this->thank_you_page) && $this->show_thank_you_detail == 'yes') {
                    die('<html><head><script>window.top.location.href = "' . $this->thank_you_page . '";</script></head></html>');
                } else {
                    die('<html><head><script>window.top.location.href = "' . $this->get_return_url($order) . '";</script></head></html>');
                }
            } else {
            ?>
                <div id="meshulam-iframe-container">
                    <div class="close_popup_meshulam"><img src="<?php echo MESHULAM_PLUGIN_URL . 'assets/images/close-icon.png'; ?>" height="30" width="30"> </div>
                    <h2 style="color: #e61717; background: #000; text-align: center; padding: 20px; position: absolute; top: 40%; border-radius: 20px; max-width: 90%; left: 0; right: 0; margin: 0 auto;">
                        <?php echo __('Failed ', 'meshulam-payment-gateway') . $body["err"]["message"]; ?></h2>
                </div>
                <?php
                $send_array = 'id : ' . $body["err"]['id'] . ' message: ' . $body["err"]["message"];
                $args = array(
                    'method' => 'POST',
                    'headers' => array(),
                    'body' => array(
                        'email' => get_option('meshulam_payment_user_email'),
                        'access_key' => get_option('meshulam_payment_user_access_key'),
                        'return_url' => '' . home_url() . '',
                        'response' => $send_array,
                        'phone' => $order->get_billing_phone(),
                        'bill_email' => $order->get_billing_email(),
                        'order_id' => $order->get_id(),

                    ),
                );
                $response = wp_remote_post('https://meshulamplugin.co.il/api/meshulam-log.php', $args);
                $body = json_decode($response['body'], true);
                if (!is_wp_error($response)) {
                }
                return;
            }
        }
    }

    // get payment page
    public function get_payment_page($response, WC_Order $order)
    {
        if (!is_wp_error($response)) {
            $body = json_decode($response['body'], true);
            $order_id = $order->get_id();
            if ($body["status"] == 1) {
                $token_val = serialize($body["data"]["processToken"]);
                $payment_id = $body["data"]["processId"];
                $authCode = $body["data"]["authCode"];
                delete_post_meta($order->get_id(), 'meshulam_card_token_detail');
                delete_post_meta($order->get_id(), 'meshulam_transaction_id');
                update_post_meta($order->get_id(), 'meshulam_card_token_detail', $token_val, true);
                update_post_meta($order->get_id(), 'meshulam_transaction_id', $payment_id, true);
                update_post_meta($order->get_id(), 'meshulam_j5_on', $this->j5_mode, true);
                $order->save();
                return $authCode;
            }
        }
    }

    //meshulam server response direct j4 execute without j5
    public function meshulam_server_response_direct_j4execute()
    {
        if (!empty($_POST)) {
            $logger = wc_get_logger();
            $logger->add('meshulam_notify_response_direct_j4', 'WP Remote Post Response: ' . print_r($_POST, true));
            if ($_POST['status'] == '1' && isset($_POST['data']['customFields']['cField1'])) {
                $order_id = $_POST['data']['customFields']['cField1'];
                $payment_method_id = $_POST['data']['transactionTypeId'];

                $payment_method_name = 'Grow Wallet';

                if ($payment_method_id == 1) {
                    $payment_method_name = "Grow Wallet Credit Card";
                }

                if ($payment_method_id == 6) {
                    $payment_method_name = "Grow Wallet Bit";
                }

                if ($payment_method_id == 13) {
                    $payment_method_name = "Grow Wallet Apple Pay";
                }

                if ($payment_method_id == 14) {
                    $payment_method_name = "Grow Wallet Google Pay";
                }

                $order = wc_get_order($order_id);
                $status = $order->get_status();
                if ($status == 'pending' || $status == 'on-hold') {
                    $tr_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                    $transactionId = $_POST['data']['transactionId'];
                    $transactionToken = $_POST['data']['transactionToken'];
                    delete_post_meta($order->get_id(), 'approved_transactionId');
                    delete_post_meta($order->get_id(), 'approved_transactionToken');
                    update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
                    update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
                    update_post_meta($order->get_id(), 'order_already_passed', '1');

                    update_post_meta($order->get_id(), 'wallet_payment_title', $payment_method_name);

                    $this->integromat_send_meshulam_order_data($order->get_id());
                    $asmachta = $_POST['data']['asmachta'];
                    update_post_meta($order->get_id(), 'meshula_order_asmachta', $asmachta);
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
            $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
            if ($pay_type == 1) {
                $pagecode = $this->recurring_pagecode;
            } //for recurring
            else {
                $pagecode = $this->pagecode;
            } // for simple

            $args_body = [
                'pageCode' => $pagecode,
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
                $logger->add('grow_wallet_approve_payment_direct_j4', 'Before Sending Data to Meshulam');
                $logger->add('grow_wallet_approve_payment_direct_j4', 'Request: ' . print_r($args_body, true));
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
                    $logger->add('grow_wallet_approve_payment_direct_j4', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                }
            } else {
                if ($this->debug == 'yes') {
                    $logger->add('grow_wallet_approve_payment_direct_j4', 'WP Remote Post Completed');
                    $data = json_decode($res['body']);
                    $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    $logger->add('grow_wallet_approve_payment_direct_j4', 'WP Remote Post Response: ' . print_r($file_data, true));
                }
            }
        }
    }

    //meshulam server response
    public function meshulam_server_response()
    {
        // get meshulam response
        if (!empty($_POST)) {
            $logger = wc_get_logger();
            $logger->add('grow_wallet_notify_response', 'WP Remote Post Response: ' . print_r($_POST, true));
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
                    $tr_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
                    $order_status = $this->order_status;
                    if ($status != 'on-hold') {
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                        $order->update_status('on-hold');
                        $this->integromat_send_meshulam_order_data($order_id);
                        $order->save();
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
                $logger->add('grow_wallet_ipn_direct_j4', 'New IPN Fired');
                $logger->add('grow_wallet_ipn_direct_j4', 'Result: ' . print_r($_REQUEST, true));
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
                    $tr_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                    $woocommerce->cart->empty_cart();
                    update_post_meta($order_id, 'order_already_passed', '1');
                    $order->update_status($this->order_status);
                    $this->integromat_send_meshulam_order_data($order_id);
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
                        $transaction_id = get_post_meta($_REQUEST['cField1'], 'meshulam_transaction_id', true);
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $transaction_id));
                        $this->integromat_send_meshulam_order_data($order_id);
                        $order->save();
                        $this->get_paymentprocessinfo_directj4($order);
                        return;
                    } elseif ('162' == $error_id && isset($j_input["data"]['new_payment_id'])) {
                        //2.2 Failure at the level of credit card  data -> open card data iframe again
                        $new_payment_id = $j_input["data"]['new_payment_id'];
                        update_post_meta($order->get_id(), 'meshulam_transaction_id', $new_payment_id, true);
                        $redirect_url = $_REQUEST['data_url'];
                ?>
                        <script>
                            let data = {
                                iframeError: {
                                    message: '<?php echo $error_message; ?>'
                                }
                            };
                            parent.postMessage(data, '*');
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
        $order_id = $_REQUEST['cField1'];
        if ($this->debug == 'yes') {
            $logger = wc_get_logger();
            $logger->add('grow_wallet_ipn', 'New IPN Fired');
            $logger->add('grow_wallet_ipn', 'Result: ' . print_r($_REQUEST, true));
        }
        global $woocommerce;
        $order = wc_get_order($order_id);
        $status = $order->get_status();
        if ($status == 'processing' || $status == 'completed' || $status == 'on-hold') {
            $this->redirect_order_received($order_id);
        }

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
                $transaction_id = get_post_meta($_REQUEST['cField1'], 'meshulam_transaction_id', true);
                $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $transaction_id));
                $order->update_status('on-hold');
                $this->integromat_send_meshulam_order_data($order_id);
                $woocommerce->cart->empty_cart();
                $order->save();
                $this->meshulamApprovePayment($order);
                return;
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
                    $this->integromat_send_meshulam_order_data($order_id);
                    $woocommerce->cart->empty_cart();
                    $order->save();
                    $this->meshulamApprovePayment($order);
                    return;
                } elseif ('162' == $error_id && isset($j_input["data"]['new_payment_id'])) {

                    //2.2 Failure at the level of credit card  data -> open card data iframe again
                    $new_payment_id = $j_input["data"]['new_payment_id'];
                    update_post_meta($order->get_id(), 'meshulam_transaction_id', $new_payment_id, true);
                    $redirect_url = $_REQUEST['data_url'];
                    ?>
                    <script>
                        let data = {
                            iframeError: {
                                message: '<?php echo $error_message; ?>'
                            }
                        };
                        parent.postMessage(data, '*');
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
        $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
        $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
        $pay_sum = $order->get_total();
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        if ($pay_type == 1) {
            $pagecode = $this->recurring_pagecode;
        } //for recurring
        else {
            $pagecode = $this->pagecode;
        } // for simple
        $args_body = [
            'pageCode' => $pagecode,
            'processToken' => $processToken,
            'processId' => $processId,
        ];
        if ($this->debug == 'yes') {
            $logger->add('grow_wallet_get_payment_process_info_direct_j4', 'Before Sending Data to Meshulam');
            $logger->add('grow_wallet_get_payment_process_info_direct_j4', 'Request: ' . print_r($args_body, true));
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
                $logger->add('grow_wallet_get_payment_process_info_direct_j4', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $logger->add('grow_wallet_get_payment_process_info_direct_j4', 'WP Remote Post Completed');
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('grow_wallet_get_payment_process_info_direct_j4', 'WP Remote Post Response: ' . print_r($file_data, true));
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
        $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
        $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
        $pay_sum = $order->get_total();
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        if ($pay_type == 1) {
            $pagecode = $this->recurring_pagecode;
            // for recurring
        } else {
            $pagecode = $this->regular_pagecode;
            // for simple
        }

        //Get transaction id and token from get payment process info API
        //getPaymentProcessInfo_url
        $args_body = [
            'pageCode' => $pagecode,
            'processToken' => $processToken,
            'processId' => $processId,
        ];
        if ($this->debug == 'yes') {
            $logger->add('grow_wallet_before_approve_payment', 'Before Sending Data to Meshulam');
            $logger->add('grow_wallet_before_approve_payment', 'Request: ' . print_r($args_body, true));
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
                $logger->add('grow_wallet_before_approve_payment', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($this->debug == 'yes') {
                $logger->add('grow_wallet_before_approve_payment', 'WP Remote Post Completed');
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('grow_wallet_before_approve_payment', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
        }
        $body = json_decode($res['body'], true);
        if ($body['status'] == '1') {
            $api_status = $body['data']['transactions'][0]['status'];
            $transactionId = $body['data']['transactions'][0]['transactionId'];
            $transactionToken = $body['data']['transactions'][0]['transactionToken'];
            delete_post_meta($order->get_id(), 'approved_transactionId');
            delete_post_meta($order->get_id(), 'approved_transactionToken');
            update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
            update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
            $args = array($order_id);
            wp_schedule_single_event(time() + 300, 'meshulam_cron_paymentinfo_sixty_sec', $args);
            wp_schedule_single_event(time() + 960, 'meshulam_cron_paymentinfo_sixty_sec', $args);
            wp_schedule_single_event(time() + 3360, 'meshulam_cron_paymentinfo_sixty_sec', $args);
            $paymentSum = $body['data']['transactions'][0]['sum'];
        }
        $this->redirect_order_received($order->get_id());
    }
}
