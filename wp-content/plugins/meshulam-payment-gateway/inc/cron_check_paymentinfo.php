<?php
add_action('meshulam_cron_paymentinfo', 'function_meshulam_J5_process');
add_action('meshulam_cron_paymentinfo_thirty_sec', 'function_meshulam_J5_process');
add_action('meshulam_cron_paymentinfo_sixty_sec', 'function_meshulam_J5_process');
add_action('meshulam_cron_paymentinfo_two_min', 'function_meshulam_J5_process');
add_action('meshulam_J5_process', 'function_meshulam_J5_process');
function function_meshulam_J5_process($order_id)
{
    global $woocommerce;
    $order = wc_get_order($order_id);
    $logger = wc_get_logger();
    $passed = get_post_meta($order_id, 'order_already_passed', true);
    if ($passed == '1') {
        return;
    }
    $status = $order->get_status();

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
    $j5_mode = get_post_meta($order_id, 'meshulam_j5_on', true);
    if ($status == 'processing' || $status == 'completed') {
        $redirect_url = isset($cls->thank_you_page) && !empty($cls->thank_you_page) ? $cls->thank_you_page : $order->get_checkout_order_received_url();
        wp_redirect($redirect_url);
        exit;
    }
    $order_status = $cls->order_status;
    $args_body = [
        'pageCode' => $pagecode,
        'processToken' => $processToken,
        'processId' => $processId,
    ];
    if ($cls->debug == 'yes') {
        $logger->add('schedule_cron_get_payment_info', 'WP Remote Request: ' . print_r($args_body, true));
    }
    if ($j5_mode == 'yes') {
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
                $logger->add('schedule_cron_get_payment_info', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
            }
        } else {
            if ($cls->debug == 'yes') {
                $logger->add('schedule_cron_get_payment_info', 'WP Remote Post Completed');
                $data = json_decode($res['body']);
                $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                $logger->add('schedule_cron_get_payment_info', 'WP Remote Post Response: ' . print_r($file_data, true));
            }
            $body = json_decode($res['body'], true);
            if ($body['status'] == '1' && !empty($body['data']['transactions']) ) {

                foreach( $body['data']['transactions'] as $transaction ){
                    $transactionId = $transaction['transactionId'];
                    $transactionToken = $transaction['transactionToken'];
                    $transactionstatus = $transaction['status'];

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
                        $asmachta = $transaction['asmachta'];
                        update_post_meta($order_id, 'meshula_order_asmachta', $asmachta);

                        $transaction['customFields']['cField1'] = $order_id;
                        $transaction['processId'] = $body['data']['processId'];
                        $transaction['processToken'] = $body['data']['processToken'];

                        $cls->meshulam_approveTransaction($transaction);
                        $order->add_order_note(sprintf(__('Payment complete<br/>Asmachta: %s<br/>Transaction ID: %s', 'meshulam'), $asmachta, $transactionId));
                        update_post_meta($order_id, 'order_already_passed', '1');
                    }

                }

            }
        }
    }
}
add_action('meshulam_regularj4_cron_paymentinfo_sixty_sec', 'function_regularj4_cron_process');
function function_regularj4_cron_process($order_id)
{
    global $woocommerce;
    $order = wc_get_order($order_id);
    $passed = get_post_meta($order_id, 'order_already_passed', true);
    if ($passed == '1') {
        return;
    }
    $status = $order->get_status();
    if ($order->get_payment_method() == 'bitpay-payment') {
        $cls = new WC_BitPay_Meshulam_Gateway();
        $processId = get_post_meta($order_id, 'bitpay_transaction_id', true);
        $processToken = unserialize(get_post_meta($order->get_id(), 'bitpay_card_token_detail', true));
        $pagecode = $cls->pagecode;
    } else if ($order->get_payment_method() == 'apple-payment') {
        $cls = new WC_Apple_Meshulam_Gateway();
        $processId = get_post_meta($order_id, 'applepay_transaction_id', true);
        $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
        $pagecode = $cls->pagecode;
    } else if ($order->get_payment_method() == 'grow-wallet-payment') {
        $cls = new WC_Grow_Wallet_Gateway();
        $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
        $processId = get_post_meta($order->get_id(), 'meshulam_transaction_id', true);
        $pagecode = $cls->pagecode;
    } else {
        $cls = new WC_MeshulamPay_Gateway();
        $processId = get_post_meta($order_id, 'meshulam_transaction_id', true);
        $processToken = unserialize(get_post_meta($order->get_id(), 'meshulam_card_token_detail', true));
        $pay_type = unserialize($order->get_meta('meshulam_pay_payment-type'));
        if ($pay_type == 1) {$pagecode = $cls->recurring_pagecode;} //for recurring
        else { $pagecode = $cls->regular_pagecode;} // for simple
    }
    if ($cls->debug == 'yes') {
        $logger = wc_get_logger();
    }
    $args_body = [
        'pageCode' => $pagecode,
        'processToken' => $processToken,
        'processId' => $processId,
    ];
    if ($cls->debug == 'yes') {
        $logger->add('cron_meshulam_get_payment_process_info_direct_j4', 'Before Sending Data to Meshulam');
        $logger->add('cron_meshulam_get_payment_process_info_direct_j4', 'Request: ' . print_r($args_body, true));
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
            $logger->add('cron_meshulam_get_payment_process_info_direct_j4', 'WP Remote Post Error: ' . print_r($res->get_error_message(), true));
        }
    } else {
        if ($cls->debug == 'yes') {
            $logger->add('cron_meshulam_get_payment_process_info_direct_j4', 'WP Remote Post Completed');
            $data = json_decode($res['body']);
            $file_data = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            $logger->add('cron_meshulam_get_payment_process_info_direct_j4', 'WP Remote Post Response: ' . print_r($file_data, true));
        }
    }
    $body = json_decode($res['body'], true);
    if ($body['status'] == '1' && !empty($body['data']['transactions']) ) {

        foreach( $body['data']['transactions'] as $transaction ){

            if( $transaction['status'] == 'שולם' ){
                $transaction['customFields']['cField1'] = $body['data']['customField']['cField1'];
                $transaction['processId'] = $body['data']['processId'];
                $transaction['processToken'] = $body['data']['processToken'];
                $cls->meshulam_approveTransaction($transaction);
                $order->add_order_note(sprintf(__('Process created<br/>Process ID: %s', 'meshulam'), $processId));
                $transactionId = $transaction['transactionId'];
                $transactionToken = $transaction['transactionToken'];
                $asmachta = $transaction['asmachta'];
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

    }
}