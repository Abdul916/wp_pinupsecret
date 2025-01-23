<?php
defined('ABSPATH') || exit; // Exit if accessed directly
add_action('wp_ajax_meshulam_grow_wallet_iframe', 'meshulam_grow_wallet_iframe_ppopup_function');
add_action('wp_ajax_nopriv_meshulam_grow_wallet_iframe', 'meshulam_grow_wallet_iframe_ppopup_function');
function meshulam_grow_wallet_iframe_ppopup_function()
{
    global $woocommerce;
    if( $woocommerce->session->order_awaiting_payment ){
        $order_id = $woocommerce->session->order_awaiting_payment;
    }else{
        $order_id = !empty( $_REQUEST['order_id'] ) ? $_REQUEST['order_id'] : false;
    }

    if( $order_id ){
        $order = wc_get_order($order_id);
        $payment_method = $order->get_payment_method();
        if ($payment_method == 'grow-wallet-payment') {
            $mes = new WC_Grow_Wallet_Gateway();
            $res = $mes->doPaymentWithNewAPI($order_id);
            if ($res != '') {
                echo $res;
            } else {
                echo 'false';
            }
        }
    }else{
        echo 'false';
    }

    die();
}

add_action('wp_ajax_meshulam_popup_payment_iframe', 'create_order_checkout_popup');
add_action('wp_ajax_nopriv_meshulam_popup_payment_iframe', 'create_order_checkout_popup');
function create_order_checkout_popup()
{
    global $woocommerce;
    if( $woocommerce->session->order_awaiting_payment ){
        $order_id = $woocommerce->session->order_awaiting_payment;
    }else{
        $order_id = !empty( $_REQUEST['order_id'] ) ? $_REQUEST['order_id'] : false;
    }

    if( $order_id ){
        $order = wc_get_order($order_id);

        $payment_method = $order->get_payment_method();
        if ($payment_method == 'meshulam-payment') {
            $popup_show = get_option('woocommerce_meshulam-payment_settings')['meshulam_popup_show'];
            if (!isset($popup_show) || $popup_show == 'no') {
                echo 'false';
                die();
            }
        }
        if ($payment_method == 'bitpay-payment') {
            $popup_show = get_option('woocommerce_bitpay-payment_settings')['bit_popup_show'];
            if (!isset($popup_show) || $popup_show == 'no') {
                echo 'false';
                die();
            }
        }
        if ($payment_method == 'googlepay-payment') {
            $popup_show = get_option('woocommerce_googlepay-payment_settings')['googlepay_popup_show'];
            if (!isset($popup_show) || $popup_show == 'no') {
                echo 'false';
                die();
            }
        }

        if ($payment_method == 'meshulam-payment') {
            $mes = new WC_MeshulamPay_Gateway();
            echo '<div class="popup_overlay_meshulam">';
            $mes->receipt_page($order_id);
            echo '</div>';
        }
        if ($payment_method == 'apple-payment') {
            $apple = new WC_Apple_Meshulam_Gateway();
            $apple->receipt_newapi_page($order_id);
        }
        if ($payment_method == 'bitpay-payment') {
            $bit = new WC_BitPay_Meshulam_Gateway();
            echo '<div class="popup_overlay_meshulam"><div class="close_popup_bit">X</div>';
            $bit->receipt_newapi_page($order_id);
            echo '</div>';
        }
        if ($payment_method == 'cal-payment') {
            $cal = new WC_Cal_Meshulam_Gateway();
            echo '<div class="popup_overlay_meshulam"><div class="close_popup_bit">X</div>';
            $cal->receipt_newapi_page($order_id);
            echo '</div>';
        }
        if ($payment_method == 'googlepay-payment') {
            $google = new WC_GooglePay_Meshulam_Gateway();
            echo '<div class="popup_overlay_meshulam"><div class="close_popup_bit">X</div>';
            $google->receipt_newapi_page($order_id);
            echo '</div>';
        }
    }else{
        echo 'false';
    }
    die();
}