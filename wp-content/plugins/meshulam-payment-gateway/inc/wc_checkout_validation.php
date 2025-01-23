<?php
defined('ABSPATH') || exit; // Exit if accessed directly

add_action('woocommerce_after_checkout_validation', 'grow_validate_custom_checkout_fields', 10, 2);
function grow_validate_custom_checkout_fields($data, $errors){
    if (!empty($_POST['billing_first_name']) && empty($_POST['billing_last_name'])) {
        if (!grow_validate_full_name($_POST['billing_first_name'])) {
            $errors->add('billing_first_name', 'נא להוסיף שם משפחה.', array('id' => 'billing_first_name'));
        }
    }
}

function grow_validate_full_name($full_name){
    return strlen($full_name) >= 2 && strlen($full_name) < 100 && count(explode(' ', $full_name)) > 1;
}


add_filter('woocommerce_coupon_is_valid', 'disable_coupon_if_specific_product_in_cart', 10, 2);
function disable_coupon_if_specific_product_in_cart($valid, $coupon) {

    $is_disabled = is_coupon_disabled_for_recurring();
    if( $is_disabled ){

        foreach (WC()->cart->get_cart() as $cart_item) {
            $meshulam_recurring = get_post_meta($cart_item['product_id'], 'meshulam_recurring', true);
            if ($meshulam_recurring == 'yes') {
                $valid = false;
                wc_add_notice(__('Coupons are not allowed when this product is in the cart.', 'meshulam-payment-gateway'), 'error');
                break;
            }
        }

        if (!$valid) {
            add_filter('woocommerce_coupon_error', 'remove_default_coupon_error_message', 10, 3);
        }

    }

    return $valid;
}


add_filter( 'pwgc_gift_card_can_be_redeemed', 'custom_pwgc_git_card_can_be_redeemed', 10, 2 );
function custom_pwgc_git_card_can_be_redeemed( $message, $gift_card ) {
    $gift_card_allowed = true;

    $is_disabled = is_coupon_disabled_for_recurring();
    if( $is_disabled ){
        foreach (WC()->cart->get_cart() as $cart_item) {
            $meshulam_recurring = get_post_meta($cart_item['product_id'], 'meshulam_recurring', true);
            if ($meshulam_recurring == 'yes') {
                $gift_card_allowed = false;
                break;
            }
        }

        if ( ! $gift_card_allowed ) {
            $message = __('Gift cards cannot be redeemed when this product is in the cart.', 'meshulam-payment-gateway');
        }
    }

    return $message;
}

function remove_default_coupon_error_message($err, $err_code, $coupon) {
    if ($err_code == 100) {
        return '';
    }
    return $err;
}


function is_coupon_disabled_for_recurring(){
    $wallet = get_option('woocommerce_grow-wallet-payment_settings');
    $meshulam = get_option('woocommerce_meshulam-payment_settings');

    $disable = false;
    if( !empty($wallet['disable_coupon_rec_prd']) && $wallet['disable_coupon_rec_prd'] == 'yes' ){
        $disable = true;
    }elseif( !empty($meshulam['disable_coupon_rec_prd']) && $meshulam['disable_coupon_rec_prd'] == 'yes' ){
        $disable = true;
    }
    return $disable;
}


//add_action( 'init', 'dm_test');
function dm_test(){

    $payment_type = [];
    $wallet = get_option('woocommerce_grow-wallet-payment_settings');
    $meshulam = get_option('woocommerce_meshulam-payment_settings');

    if( !empty($wallet['payment_type']) ){
        $payment_type = $wallet['payment_type'];
    }elseif( !empty($meshulam['payment_type']) ){
        $payment_type = $meshulam['payment_type'];
    }

    if (in_array("direct_debit_2", $payment_type)) {
        print_r( $payment_type );
    }

}