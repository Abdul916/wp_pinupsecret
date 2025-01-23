<?php

add_filter('woocommerce_add_to_cart_validation', 'validate_products_for_recursive', 10, 5);
function validate_products_for_recursive($passed, $product_id, $quantity, $variation_id = '', $variations = '') {
    $payment_type = [];
    $wallet = get_option('woocommerce_grow-wallet-payment_settings');
    $meshulam = get_option('woocommerce_meshulam-payment_settings');
    if( !empty($wallet['payment_type']) ){
        $payment_type = $wallet['payment_type'];
    }elseif( !empty($meshulam['payment_type']) ){
        $payment_type = $meshulam['payment_type'];
    }

    if (is_array($payment_type)) {
        if (in_array("direct_debit_2", $payment_type)) {
            global $woocommerce;
            $items = $woocommerce->cart->get_cart();
            $error = 0;
            $new_install_no = get_post_meta($product_id, '_meshulam_pay_field', true);
            $new_install_check = get_post_meta($product_id, '_meshulam_checkbox_field', true);
            if ($new_install_no > 0 || $new_install_check == 'yes') {
                if (!empty($items)) {
                    foreach ($items as $item => $values) {
                        $pid = $values['data']->get_id();
                        $installment_no = get_post_meta($pid, '_meshulam_pay_field', true);
                        $installment_unlimited = get_post_meta($pid, '_meshulam_checkbox_field', true);
                        if ($installment_no > 0 || $installment_unlimited == 'yes') {

                        } else {
                            $error = 1;
                        }
                    }
                }
            } else {
                if (!empty($items)) {
                    foreach ($items as $item => $values) {
                        $pid = $values['data']->get_id();
                        $installment_no = get_post_meta($pid, '_meshulam_pay_field', true);
                        $installment_unlimited = get_post_meta($pid, '_meshulam_checkbox_field', true);
                        if ($installment_no > 0 || $installment_unlimited == 'yes') {
                            $error = 1;
                        }
                    }
                }
            }
            if ($error == 1) {
                wc_add_notice(__('You cant add subscription product with regular product to cart', 'meshulam-payment-gateway'), 'error');
                return false;
            }
        }
    }

    return true;
}