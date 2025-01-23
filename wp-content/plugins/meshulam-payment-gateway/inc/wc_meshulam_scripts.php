<?php
add_action('admin_enqueue_scripts', 'meshulam_scripts_admin');

function meshulam_scripts_admin()
{
    wp_enqueue_style('form-design-sytle', MESHULAM_PLUGIN_URL . '/assets/css/form-design.css', array(), MESHULAM_VERSION);
    wp_enqueue_style('meshulam-pay-sytle', MESHULAM_PLUGIN_URL . '/assets/css/meshulam_pay_style.css', array(), MESHULAM_VERSION);
    wp_enqueue_style('meshulam-sytle', MESHULAM_PLUGIN_URL . '/assets/css/meshulam_sytle.css', array(), MESHULAM_VERSION);

    wp_enqueue_script('meshulam-payment-js', MESHULAM_PLUGIN_URL . '/assets/js/meshulam_payment.js', array(), MESHULAM_VERSION);
    wp_enqueue_style('bitpay-sytle', MESHULAM_PLUGIN_URL . '/assets/css/bitpay_sytle.css', array(), MESHULAM_VERSION);

    wp_enqueue_script('admin_bit_payment_select_multiple', 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/0.9.13/js/bootstrap-multiselect.min.js');

}

add_action('wp_enqueue_scripts', 'meshulam_scripts_user');

function meshulam_scripts_user()
{
    wp_enqueue_style('form-design-sytle', MESHULAM_PLUGIN_URL . '/assets/css/form-design.css', array(), MESHULAM_VERSION);
    wp_enqueue_style('meshulam-pay-sytle', MESHULAM_PLUGIN_URL . '/assets/css/meshulam_pay_style.css', array(), MESHULAM_VERSION);
    wp_enqueue_style('meshulam-sytle', MESHULAM_PLUGIN_URL . '/assets/css/meshulam_sytle.css', array(), MESHULAM_VERSION);

    wp_enqueue_script('meshulam-payment-js', MESHULAM_PLUGIN_URL . '/assets/js/meshulam_payment.js', array(), MESHULAM_VERSION);
    if (!isset($_GET['pay_for_order'])) {
        wp_enqueue_script('meshulam-payment-popup-js', MESHULAM_PLUGIN_URL . '/assets/js/meshulam_payment_popup.js', array(), MESHULAM_VERSION);
    }
    wp_enqueue_style('bit_payment_css', MESHULAM_PLUGIN_URL . '/assets/css/bit_pay_style.css', array(), MESHULAM_VERSION);

    wp_enqueue_style('bit_payment_font_awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css', array(), MESHULAM_VERSION);

}
