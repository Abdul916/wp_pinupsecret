<?php
add_filter('woocommerce_order_data_store_cpt_get_orders_query', 'handle_order_number_custom_query_var', 10, 2);
function handle_order_number_custom_query_var($query, $query_vars)
{
    if (!empty($query_vars['order_not_passed'])) {
        $query['meta_query'][] = array(
            'relation' => 'AND',
            array(
                'key' => 'order_already_passed',
                'value' => 0,
            ),
            array(
                'key' => 'main_meshulam_cron',
                'compare' => 'NOT EXISTS',
            ),
        );
    }

    return $query;
}

function myprefix_custom_cron_schedule($schedules)
{
    $schedules['every_six_hours'] = array(
        'interval' => 21600, // Every 6 hours
        'display' => __('Every 6 hours'),
    );
    return $schedules;
}
add_filter('cron_schedules', 'myprefix_custom_cron_schedule');

//Schedule an action if it's not already scheduled
if (!wp_next_scheduled('meshulam_main_cron_hook')) {
    wp_schedule_event(time(), 'every_six_hours', 'meshulam_main_cron_hook');
}

///Hook into that action that'll fire every six hours
add_action('meshulam_main_cron_hook', 'meshulam_main_cron_hook_function');

//create your function, that runs on cron
function meshulam_main_cron_hook_function()
{
    $args = array(
        'status' => array('wc-pending'),
        'order_not_passed' => '121',
        'limit' => -1,
        'return' => 'ids',
        'date_created' => '<' . (time() - 3600),
    );
    $orders = wc_get_orders($args);
    // echo '<pre>';print_r($orders);exit;
    if (!empty($orders)) {
        $logger = wc_get_logger();
        foreach ($orders as $order_id) {
            $order = wc_get_order($order_id);
            $status = $order->get_status();
            $j5_mode = get_post_meta($order_id, 'meshulam_j5_on', true);
            // echo $order_id;exit;
            if ($order->get_payment_method() == 'bitpay-payment') {
                $cls = new WC_BitPay_Meshulam_Gateway();
                $tr_id = get_post_meta($order_id, 'bitpay_transaction_id', true);
                $processToken = unserialize(get_post_meta($order->get_id(), 'bitpay_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'bitpay_transaction_id', true);
                $pagecode = $cls->pagecode;
            } else if ($order->get_payment_method() == 'apple-payment') {
                $cls = new WC_Apple_Meshulam_Gateway();
                $tr_id = get_post_meta($order_id, 'applepay_transaction_id', true);
                $processToken = unserialize(get_post_meta($order->get_id(), 'applepay_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'applepay_transaction_id', true);
                $pagecode = $cls->pagecode;
            } else if ($order->get_payment_method() == 'grow-wallet-payment') {
                $cls = new WC_Grow_Wallet_Gateway();
                $tr_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
                $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
                $pagecode = $cls->pagecode;
            } else {
                $cls = new WC_MeshulamPay_Gateway();
                $tr_id = get_post_meta($order_id, 'meshulam_transaction_id', true);
                $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
                $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
                $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
                if ($pay_type == 1) {$pagecode = $cls->recurring_pagecode;} //for recurring
                else { $pagecode = $cls->regular_pagecode;} // for simple
            }
            $args_body = [
                'pageCode' => $pagecode,
                'processToken' => $processToken,
                'processId' => $processId,
            ];
            if ($cls->debug == 'yes') {
                $logger->add('main_cron_get_payment_info', 'WP Remote Request: ' . print_r($args_body, true));
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
            $res = wp_remote_post($cls->getPaymentProcessInfo_url, $args);
            if (is_wp_error($res)) {
                if ($cls->debug == 'yes') {
                    $logger->add('main_cron_get_payment_info', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
                }
            } else {
                if ($cls->debug == 'yes') {
                    $logger->add('main_cron_get_payment_info', 'WP Remote Post Completed');
                    $data = json_decode($res['body']);
                    $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                    $logger->add('main_cron_get_payment_info', 'WP Remote Post Response: ' . print_r($file_data, true));
                }
            }

            if ($j5_mode == 'yes') {
                $body = json_decode($res['body'], true);
                if ($body['status'] == '1') {
                    $transactionId = $body['data']['transactions'][0]['transactionId'];
                    $transactionToken = $body['data']['transactions'][0]['transactionToken'];
                    $transactionstatus = $body['data']['transactions'][0]['status'];
                    update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
                    update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
                    if ($transactionstatus == 'עסקה מושהית') {
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                        $order->update_status('on-hold');
                        $woocommerce->cart->empty_cart();
                        $order->save();
                    }
                    if ($transactionstatus == 'שולם') {
                        $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $tr_id));
                        $order->update_status('processing');
                        $woocommerce->cart->empty_cart();
                        $order->save();
                        $asmachta = $body['data']['transactions'][0]['asmachta'];
                        update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);
                        $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $transactionId));
                        update_post_meta($order_id, 'order_already_passed', '1');
                    }
                }
            } else {
                $body = json_decode($res['body'], true);
                if ($body['status'] == '1' && $body['data']['transactions'][0]['status'] == 'שולם') {
                    $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $processId));
                    $transactionId = $body['data']['transactions'][0]['transactionId'];
                    $transactionToken = $body['data']['transactions'][0]['transactionToken'];
                    $asmachta = $body['data']['transactions'][0]['asmachta'];
                    $order->update_status($cls->order_status);
                    delete_post_meta($order->get_id(), 'approved_transactionId');
                    delete_post_meta($order->get_id(), 'approved_transactionToken');
                    update_post_meta($order->get_id(), 'approved_transactionId', $transactionId, true);
                    update_post_meta($order->get_id(), 'approved_transactionToken', $transactionToken, true);
                    update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);
                    update_post_meta($order_id, 'order_already_passed', '1');
                    $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $transactionId));
                }
            }
            update_post_meta($order->get_id(), 'main_meshulam_cron', 1, true);

        }
    }
}
