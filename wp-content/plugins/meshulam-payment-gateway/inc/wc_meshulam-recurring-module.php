<?php
class Recurring_meshulam_class
{
    public function __construct()
    {
        // Add sub menu tab in woocommerce
        $manage_recurring = get_option('meshulam_manage_recurring');
        if ($manage_recurring == '1') {
            add_action('admin_enqueue_scripts', [$this, 'load_admin_recurring_orders_scripts']);
            add_action('admin_menu', [$this, 'register_meshulam_recurruing_list'], 99);
            add_action('admin_action_meshul_recurring_update_form', [$this, 'meshul_recurring_update_form_function']);
            add_action('wp_ajax_update_user_data_meshulam_recurring_ajax', [$this, 'update_user_data_meshulam_recurring_ajax']);
            add_action('wp_ajax_noprivupdate_user_data_meshulam_recurring_ajax', [$this, 'update_user_data_meshulam_recurring_ajax']);
        }
    }
    public function update_user_data_meshulam_recurring_ajax()
    {
        $logger = wc_get_logger();
        $order_id = $_POST['order_id'];
        $user_status = $_POST['user_status'];
        $update_card = $_POST['update_card'];
        $fullName = $_POST['fullName'];
        $phone = $_POST['phone'];
        $email = $_POST['email'];
        $order_day = $_POST['order_day'];
        $period = $_POST['period'];
        $total = $_POST['total'];
        if ($order_id != '') {
            $order = wc_get_order($order_id);
            if ($order->get_payment_method() == 'apple-payment') {
                $cls = new WC_Apple_Meshulam_Gateway();
                $pagecode = $cls->pagecode;
                $processToken = unserialize(get_post_meta($order->get_id(), 'applepay_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'applepay_transaction_id', true);
            } else {
                $cls = new WC_MeshulamPay_Gateway();
                $pagecode = $cls->recurring_pagecode;
                $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
            }
            //get payment process info
            $args_body = [
                'pageCode' => $pagecode,
                'processToken' => $processToken,
                'processId' => $processId,
            ];
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
            $res = wp_remote_post($cls->getPaymentProcessInfo_url, $args);
            $body = json_decode($res['body'], true);
            if ($body['status'] == '1') {
                $transactionId = $body['data']['transactions'][0]['transactionId'];
                $transactionToken = $body['data']['transactions'][0]['transactionToken'];
                $asmachta = $body['data']['transactions'][0]['asmachta'];
                if ($cls->api_test_mode == 'yes') {
                    $this->update_url = 'https://sandbox.meshulam.co.il/api/light/server/1.0/updateDirectDebit/';
                } else {
                    $this->update_url = 'https://secure.meshulam.co.il/api/light/server/1.0/updateDirectDebit/';
                }
                $args_body = array(
                    'userId' => $cls->api_userid,
                    'apiKey' => $cls->auth_code,
                    'transactionToken' => $transactionToken,
                    'transactionId' => $transactionId,
                    'asmachta' => $asmachta,
                );
                if ($user_status != '') {
                    $args_body['changeStatus'] = $user_status;
                    update_post_meta($order_id, 'meshulam_recurring_user_status', $user_status);
                }
                if ($update_card != '') {
                    $args_body['updateCard'] = $update_card;
                }
                if ($fullName != '') {
                    $args_body['fullName'] = $fullName;
                    $exp = explode(' ', $fullName, 2);
                    update_post_meta($order_id, '_billing_first_name', $exp[0]);
                    update_post_meta($order_id, '_billing_last_name', $exp[1]);
                }
                if ($period != '') {
                    $args_body['paymentNum'] = $period;
                    $exp_numpayment = serialize($period);
                    update_post_meta($order_id, 'meshulam_pay_payment-number', $exp_numpayment);
                }
                if ($phone != '') {
                    $args_body['phone'] = $phone;
                    update_post_meta($order_id, '_billing_phone', $phone);
                }
                if ($email != '') {
                    $args_body['email'] = $email;
                    update_post_meta($order_id, '_billing_email', $email);
                }
                if ($order_day != '') {
                    $args_body['chargeDay'] = $order_day;
                }
                if ($total != '') {
                    $args_body['sum'] = $total;
                    update_post_meta($order_id, '_order_total', $total);
                }
                $logger->add('meshulam_update_recurring_data', 'WP Remote Post Completed');
                $logger->add('meshulam_update_recurring_data', 'WP Remote Post Request: ' . print_r($args_body, true));
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
                $res = wp_remote_post($this->update_url, $args);
                if (is_wp_error($res)) {
                    $logger->add('meshulam_update_recurring_data', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                } else {
                    $data = json_decode($res['body']);
                    $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    $logger->add('meshulam_update_recurring_data', 'WP Remote Post Completed');
                    $logger->add('meshulam_update_recurring_data', 'WP Remote Post Response: ' . print_r($file_data, true));
                    $body = json_decode($res['body'], true);
                    echo $res['body'];
                }
            }
        }
        exit;
    }
    public function load_admin_recurring_orders_scripts()
    {
        wp_enqueue_style('wc-meshulam-recurring', MESHULAM_PLUGIN_URL . '/assets/css/meshulam_recurring.css', [], MESHULAM_VERSION, 'all');
        wp_enqueue_script('wc-admin-meshulam-recurring-script', MESHULAM_PLUGIN_URL . '/assets/js/wc-admin-meshulam-recurring-script.js', ['jquery'], MESHULAM_VERSION, true);
        wp_localize_script('wc-admin-meshulam-recurring-script', 'mes_rec', array('ajax_url' => admin_url('admin-ajax.php')));
    }
    public function register_meshulam_recurruing_list()
    {
        add_submenu_page('woocommerce', __('Subscriptions List', 'meshulam-payment-gateway'), __('Subscriptions List', 'meshulam-payment-gateway'), 'manage_woocommerce', 'meshulam_recurring_list', [$this, 'display_meshulam_recurring_orders_list']);
    }
    public function display_meshulam_recurring_orders_list()
    {?>
<div id="main_recuring_meshulam_div">
    <div class="recurring_loader"><img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/loader1.gif"></div>
    <div class="recuring-heading">
        <div class="recuring-logo"><img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/grow-logo.svg"></div>
        <h2><?php _e('Subscriptions List', 'meshulam-payment-gateway');?></h2>
    </div>
    <?php
if (isset($_REQUEST['do']) && isset($_REQUEST['order_id'])) {
        $this->edit_form_display_order_meshulam();
    } else {
        $list = new Meshulam_Recurring_Order_List();
        $list->prepare_items();
        ?>
    <form method="post">
        <input type="hidden" name="page" value="meshulam_recurring_list">
        <?php
$list->display();
        echo '</form>';
    }?>
</div>
<!-- confirm popup-->
<div class="meshulam_modal" id="meshulam_confirm_popup_modal">
    <div class="meshulam_modal_container">
        <div class="meshulam_modal_body">
            <h2><?php esc_html_e('Are you sure?', 'meshulam-payment-gateway');?></h2>
            <div class="bottom_btn">
                <button
                    class="btn btn-green yes-rec-btn"><?php esc_html_e('Yes', 'meshulam-payment-gateway');?></button>
                <button class="btn btn-red no-rec-btn"><?php esc_html_e('No', 'meshulam-payment-gateway');?></button>
            </div>
        </div>
    </div>
</div>
<div class="meshulam_modal" id="meshulam_confirm_user_status_popup_modal">
    <div class="meshulam_modal_container">
        <div class="meshulam_modal_body">
            <h2><?php esc_html_e('Are you sure?', 'meshulam-payment-gateway');?></h2>
            <div class="bottom_btn">
                <button
                    class="btn btn-green yes-rec-btn"><?php esc_html_e('Yes', 'meshulam-payment-gateway');?></button>
                <button class="btn btn-red no-rec-btn"><?php esc_html_e('No', 'meshulam-payment-gateway');?></button>
            </div>
        </div>
    </div>
</div>
<?php }
    public function edit_form_display_order_meshulam()
    {
        $order_id = $_REQUEST['order_id'];
        $order = wc_get_order($order_id);
        if ($order->get_payment_method() == 'apple-payment') {
            $cls = new WC_Apple_Meshulam_Gateway();
            $pagecode = $cls->pagecode;
            $processToken = unserialize(get_post_meta($order->get_id(), 'applepay_card_token_detail', true));
            $processId = get_post_meta($order->get_id(), 'applepay_transaction_id', true);
        } else {
            $cls = new WC_MeshulamPay_Gateway();
            $pagecode = $cls->recurring_pagecode;
            $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
            $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
        }
        $args_body = [
            'pageCode' => $pagecode,
            'processToken' => $processToken,
            'processId' => $processId,
        ];
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
        $res = wp_remote_post($cls->getPaymentProcessInfo_url, $args);
        if ($res['body']) {
            $body = json_decode($res['body'], true);
            $full_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
            $period = unserialize(get_post_meta($order_id, 'meshulam_pay_payment-number', true));
            $phone = $order->get_billing_phone();
            $email = $order->get_billing_email();
            $total = $order->get_total();
            $transactionId = get_post_meta($order_id, 'approved_transactionId', true);
            $transactionToken = get_post_meta($order_id, 'approved_transactionToken', true);
            $asmachta = get_post_meta($order_id, 'meshula_order_asmachta', true);
            $paymentDate = $order->get_date_created();
            $paymentDate = date('d-m-Y', strtotime($paymentDate));
            $checked = '';
            $value = '0';
            $db_user_status = get_post_meta($order_id, 'meshulam_recurring_user_status', true);
            if ($db_user_status != '0') {
                $value = '1';
                $checked = 'checked';
            }
            // $full_name = $body['data']['transactions'][0]['fullName'];
            // $phone = $body['data']['transactions'][0]['payerPhone'];
            if (array_key_exists('transactions', $body)) {
                $full_name = $body['data']['transactions'][0]['fullName'];
                $phone = $body['data']['transactions'][0]['payerPhone'];
                $email = $body['data']['transactions'][0]['payerEmail'];
                $paymentDate = $body['data']['transactions'][0]['paymentDate'];
                $explod = explode('/', $paymentDate);
                $order_day = $explod[0];
            }
            $order_day = date('d', strtotime($order->get_date_created()));
            ?>
<?php $query_args = array('page' => 'meshulam_recurring_list');
            $back_url = add_query_arg($query_args, admin_url('admin.php'));?>
<ul class="recuring-edit-wrap">
    <li>
        <a href="<?php echo $back_url; ?>" class="model_back">back</a>
    </li>
    <li>
        <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/excel-icon.png">
    </li>
    <li>
        <a href="javascript:;" class="button update_cc update_card_btn_order"
            data-order_id="<?php echo $order_id; ?>"><?php esc_html_e('Update Credit Card', 'meshulam-payment-gateway');?></a>
    </li>
    <li>
        <a href="javascript:;" class="button update_recurring_edit"
            data-order_id="<?php echo $order_id; ?>"><?php esc_html_e('Edit', 'meshulam-payment-gateway');?></a>
    </li>

</ul>
<div class="over_table">
<table class="wp-list-table wc_gateways widefat thpladmin_fields_table">
    <thead>
        <tr>
            <th><?php esc_html_e('Order No.', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Full Name', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Phone No.', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Email', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Billing Day', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Period', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Sum', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Status', 'meshulam-payment-gateway');?></th>
            <!-- <th><?php esc_html_e('Update Card', 'meshulam-payment-gateway');?></th> -->
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><?php echo $order_id; ?></td>
            <td>
                <?=$full_name?>
                <!-- <div class="edit-field">
                                <input type="text" class="edit_btn w-100" name="fullName" value="<?=$full_name?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div> -->
            </td>
            <td>
                <?=$phone?>
                <!-- <div class="edit-field">
                                <input type="text" class="edit_btn w-100" name="phone" value="<?=$phone?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div> -->
            </td>
            <td>
                <?=$email?>
                <!-- <div class="edit-field">
                                <input type="email" class="edit_btn w-100" name="email" value="<?=$email?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div>     -->
            </td>
            <td>
                <?=$order_day . ' ' . __('every month', 'meshulam-payment-gateway')?>
                <!-- <div class="edit-field">
                                <input type="number" class="edit_btn w-100" name="order_day" value="<?=$order_day?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div>         -->
            </td>
            <td>
                <?=$period . ' ' . __('months', 'meshulam-payment-gateway')?>
                <!-- <div class="edit-field">
                                <input type="number" class="edit_btn w-100" name="period" value="<?=$period?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div>     -->
            </td>
            <td>
                <?=woocommerce_price($total)?>
                <!-- <div class="edit-field">
                                <input type="number" class="edit_btn w-100" name="total" value="<?=$total?>"
                                    disabled>
                                <button type="button" class="btn btn-edit dashicons dashicons-edit"></button>
                                <span class="btn-opstion">
                                    <button type="button" class="dashicons dashicons-no-alt icon-close"></button>
                                    <button type="button" class="dashicons dashicons-yes icon-check"></button>
                                </span>
                            </div>         -->
            </td>
            <td>
                <div class="form-group"> <input type="checkbox" id="toggle_<?php echo $order_id; ?>"
                        class="chkbx-toggle user_status_check" data-order_id="<?php echo $order_id; ?>"
                        value="<?php echo $value; ?>" <?php echo $checked; ?>> <label
                        for="toggle_<?php echo $order_id; ?>"></label> </div>
            </td>
            <!-- <td><button type="button" class="button blue white-text update_card_btn_order"  data-order_id="<?php echo $order_id; ?>"><?php esc_html_e('Update Card', 'meshulam-payment-gateway');?></button></td> -->
        </tr>
    </tbody>
</table>
</div>
<h1><?php _e('Past Transactions', 'meshulam-payment-gateway');?></h1>
<div class="over_table">
<table class="wp-list-table wc_gateways widefat thpladmin_fields_table">
    <thead>
        <tr>
            <th><?php esc_html_e('#', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Transaction No.', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Billing Date', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Sum', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Period', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Status', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Recipet', 'meshulam-payment-gateway');?></th>
            <th><?php esc_html_e('Actions', 'meshulam-payment-gateway');?></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><?php echo $order_id; ?></td>
            <td>
                <?=get_post_meta($order_id, 'approved_transactionId', true)?>
            </td>
            <td>
                <?=$paymentDate?>
            </td>
            <td>
               <?=woocommerce_price($total)?>
            </td>
            <td>
                <?=$period . ' ' . __('months', 'meshulam-payment-gateway')?>
            </td>
            <td>
                <?php _e('Completed', 'meshulam-payment-gateway');?>
            </td>
            <td>
                <a href="javascript:void(0);">PDF</a>
            </td>
            <td>
                <a href="javascript:void(0);" class="btn btn-primary button"><?php _e('REFUND', 'meshulam-payment-gateway');?>
            </td>
        </tr>
    </tbody>
</table>
</div>
<div class="meshulam_modal" id="meshulam_update_details_popup_modal">
    <div class="meshulam_modal_container">
        <div class="meshulam_modal_body">
            <button href="javascript:void(0)" class="modal-close"><img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/grow-logoc.png"></button>
            <h3><?php echo __('Edit Personal Details', 'meshulam-payment-gateway'); ?></h3>
            <form action="" method="post" id="update_recurring_meshulam_form">
                <input type="hidden" name="order_id" value="<?php echo $order_id; ?>">
                <div class="inner-form-field">
                    <div class="edit-field">
                        <input type="text" class="edit_btn w-100" name="fullName" value="<?=$full_name?>" disabled>
                        <button type="button" class="btn btn-edit dashicons dashicons-edit">
                            <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/edit_grow.png">
                        </button>
                        <span class="btn-opstion">
                            <button type="button" class="dashicons dashicons-yes icon-check">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/right_grow.png">
                            </button>
                            <button type="button" class="dashicons dashicons-no-alt icon-close">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/close_grow.png">
                            </button>
                        </span>
                    </div>
                    <div class="edit-field">
                        <input type="number" class="edit_btn w-100" name="order_day" value="<?=$order_day?>" disabled>
                        <button type="button" class="btn btn-edit dashicons dashicons-edit">
                            <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/edit_grow.png">
                        </button>
                        <span class="btn-opstion">
                        <button type="button" class="dashicons dashicons-yes icon-check">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/right_grow.png">
                            </button>
                            <button type="button" class="dashicons dashicons-no-alt icon-close">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/close_grow.png">
                            </button>
                        </span>
                    </div>
                    <div class="edit-field">
                        <input type="text" class="edit_btn w-100" name="phone" value="<?=$phone?>" disabled>
                        <button type="button" class="btn btn-edit dashicons dashicons-edit">
                            <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/edit_grow.png">
                        </button>
                        <span class="btn-opstion">
                        <button type="button" class="dashicons dashicons-yes icon-check">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/right_grow.png">
                            </button>
                            <button type="button" class="dashicons dashicons-no-alt icon-close">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/close_grow.png">
                            </button>
                        </span>
                    </div>
                    <div class="edit-field">
                        <input type="number" class="edit_btn w-100" name="total" value="<?=$total?>" disabled>
                        <button type="button" class="btn btn-edit dashicons dashicons-edit">
                            <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/edit_grow.png">
                        </button>
                        <span class="btn-opstion">
                        <button type="button" class="dashicons dashicons-yes icon-check">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/right_grow.png">
                            </button>
                            <button type="button" class="dashicons dashicons-no-alt icon-close">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/close_grow.png">
                            </button>
                        </span>
                    </div>
                    <div class="edit-field">
                        <input type="email" class="edit_btn w-100" name="email" value="<?=$email?>" disabled>
                        <button type="button" class="btn btn-edit dashicons dashicons-edit">
                            <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/edit_grow.png">
                        </button>
                        <span class="btn-opstion">
                        <button type="button" class="dashicons dashicons-yes icon-check">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/right_grow.png">
                            </button>
                            <button type="button" class="dashicons dashicons-no-alt icon-close">
                                <img src="<?php echo MESHULAM_PLUGIN_URL ?>/assets/images/close_grow.png">
                            </button>
                        </span>
                    </div>
                </div>
                <div class="update_btn_submit">
                    <button type="submit" class="button button-update-detail-btn"><?php echo __('Finish', 'meshulam-payment-gateway'); ?></button>
                </div>
            </form>
        </div>
    </div>
</div>
<?php }?>
<div class="meshulam_modal" id="meshulam_recurring_order_modal">
    <div class="meshulam_modal_container">
        <div class="meshulam_modal_body">
            <button href="javascript:void(0)" class="modal-close">x</button>
            <iframe src="" height="800" width="100%" id="update_card_iframe" scrolling="no"></iframe>
        </div>
    </div>
</div>
<!-- <div class="meshulam_modal" id="meshulam_recurring_order_edit">
            <div class="meshulam_modal_container">
                <div class="meshulam_modal_body">
                    <button  href="javascript:void(0)" class="modal-close">x</button>
                    <iframe src="" height="800" width="100%" id="update_card_iframe" scrolling="no"></iframe>
                </div>
            </div>
        </div> -->
<?php }
}
new Recurring_meshulam_class();
//create class for wp list recurring orders
if (!class_exists('WP_List_Table')) {
    require_once ABSPATH . 'wp-admin/includes/class-wp-list-table.php';
}
class Meshulam_Recurring_Order_List extends WP_List_Table
{
    public function prepare_items()
    {
        $columns = $this->get_columns();
        $hidden = $this->get_hidden_columns();
        $sortable = $this->get_sortable_columns();
        $data = $this->table_data();
        // usort( $data, array( &$this, 'sort_data' ) );
        $perPage = 10;
        $currentPage = $this->get_pagenum();
        $totalItems = count($data);
        $this->set_pagination_args(array(
            'total_items' => $totalItems,
            'per_page' => $perPage,
        ));
        $data = array_slice($data, (($currentPage - 1) * $perPage), $perPage);
        $this->_column_headers = array($columns, $hidden, $sortable);
        $this->items = $data;
    }
    /**
     * Override the parent columns method. Defines the columns to use in your listing table
     *
     * @return Array
     */
    public function get_columns()
    {
        $columns = array(
            'order_status' => __('Order Status', 'meshulam-payment-gateway'),
            'client_name' => __('Client Name', 'meshulam-payment-gateway'),
            'product_name' => __('Product Name', 'meshulam-payment-gateway'),
            'order_no' => __('Order No', 'meshulam-payment-gateway'),
            'period' => __('Period', 'meshulam-payment-gateway'),
            'start_date' => __('Start Date', 'meshulam-payment-gateway'),
            'end_date' => __('End Date', 'meshulam-payment-gateway'),
            'end_date' => __('End Date', 'meshulam-payment-gateway'),
            'order_total' => __('Order Total', 'meshulam-payment-gateway'),
            'billing_date' => __('Billing Date', 'meshulam-payment-gateway'),
            'user_status' => __('Status', 'meshulam-payment-gateway'),
            'edit' => __('View', 'meshulam-payment-gateway'),
        );
        return $columns;
    }
    /**
     * Define which columns are hidden
     *
     * @return Array
     */
    public function get_hidden_columns()
    {
        return array();
    }
    /**
     * Define the sortable columns
     *
     * @return Array
     */
    public function get_sortable_columns()
    {
        return array();
    }
    /**
     * Get the table data
     *
     * @return Array
     */
    private function table_data()
    {
        $data = array();
        $orders = wc_get_orders(array(
            'limit' => -1, // Query all orders
            'status' => array('wc-processing', 'wc-completed'),
            'payment_method' => array('meshulam-payment', 'apple-payment', 'grow-wallet-payment'),
            'meta_key' => 'meshulam_pay_payment-type',
            'meta_value' => ':"1";',
            'meta_compare' => 'LIKE',
        ));
        if (!empty($orders)) {
            foreach ($orders as $key => $order_data) {
                $order_id = $order_data->get_id();
                $order = wc_get_order($order_id);
                $total = $order->get_formatted_order_total();
                $status = $order->get_status();
                $first_name = $order->get_billing_first_name() . ' ' . $order->get_billing_last_name();
                $items = $order->get_items();
                foreach ($items as $item) {
                    $product_name = $item->get_name();
                }
                $period = unserialize(get_post_meta($order_id, 'meshulam_pay_payment-number', true));
                $order_date = date('d-m-Y', strtotime($order->get_date_created()));
                $end_date = date("d-m-Y", strtotime("+$period months", strtotime($order_date)));
                if ($period == '180') {
                    $end_date = '<img src="' . MESHULAM_PLUGIN_URL . 'assets/images/infinity-icon.png" height="20">';
                    $period = '<img src="' . MESHULAM_PLUGIN_URL . 'assets/images/infinity-icon.png" height="20">';
                }
                $checked = '';
                $value = '0';
                $db_user_status = get_post_meta($order_id, 'meshulam_recurring_user_status', true);
                if ($db_user_status != '0') {
                    $value = '1';
                    $checked = 'checked';
                }
                $auto_renew = '<div class="form-group"> <input type="checkbox" id="toggle_' . $order_id . '" class="chkbx-toggle user_status_check" data-order_id="' . $order_id . '" value="' . $value . '" ' . $checked . '> <label for="toggle_' . $order_id . '"></label> </div>';
                $query_args = array('page' => 'meshulam_recurring_list', 'do' => 'edit', 'order_id' => $order_id);
                $edit_url = add_query_arg($query_args, admin_url('admin.php'));
                $data[] = array(
                    'order_status' => __(ucfirst($status), 'meshulam-payment-gateway'),
                    'client_name' => $first_name,
                    'product_name' => $product_name,
                    'order_no' => $order_id,
                    'period' => $period . ' ' . __('Months', 'meshulam-payment-gateway'),
                    'start_date' => $order_date,
                    'end_date' => $end_date,
                    'order_total' => $total,
                    'billing_date' => $order_date,
                    'user_status' => $auto_renew,
                    'edit' => '<a href="' . $edit_url . '"><img src="' . MESHULAM_PLUGIN_URL . '/assets/images/show.png"></a>',
                );
            }
        }
        return $data;
    }
    /**
     * Define what data to show on each column of the table
     *
     * @param  Array $item        Data
     * @param  String $column_name - Current column name
     *
     * @return Mixed
     */
    public function column_default($item, $column_name)
    {
        switch ($column_name) {
            case 'order_status':
            case 'client_name':
            case 'product_name':
            case 'order_no':
            case 'period':
            case 'start_date':
            case 'end_date':
            case 'order_total':
            case 'billing_date':
            case 'user_status':
            case 'edit':
                return $item[$column_name];
            default:
                return print_r($item, true);
        }
    }
    /**
     * Allows you to sort the data by the variables set in the $_GET
     *
     * @return Mixed
     */
    private function sort_data($a, $b)
    {
        // Set defaults
        $orderby = 'order_no';
        $order = 'desc';
        // If orderby is set, use this as the sort column
        if (!empty($_GET['orderby'])) {
            $orderby = $_GET['orderby'];
        }
        // If order is set use this as the order
        if (!empty($_GET['order'])) {
            $order = $_GET['order'];
        }
        $result = strcmp($a[$orderby], $b[$orderby]);
        if ($order === 'asc') {
            return $result;
        }
        return -$result;
    }
}