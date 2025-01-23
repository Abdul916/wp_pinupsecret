<?php
/*
 * Plugin Name: Grow Payment Gateway
 * Plugin URI: https://meshulamplugin.co.il/
 * Description: Grow Payment Clearing Solutions provides you payment plugin for Woocommerce.
 * Author: code&core
 * Author URI: http://codeandcore.co.il
 * Version: 7.3
 * Text Domain: meshulam-payment-gateway
 */

defined('ABSPATH') || exit; // Exit if accessed directly
define('MESHULAM_PLUGIN_URL', plugins_url('/', __FILE__));
define('MESHULAM_PLUGIN_DIR', dirname(__FILE__));
define('MESHULAM_VERSION', '7.3');

class WC_Meshulam
{
    protected static $instance = null;
    public static function get_instance()
    {
        if (!isset(static::$instance)) {
            static::$instance = new static;
        }
        return static::$instance;
    }
    public $notices = [];
    private function __construct()
    {
        register_activation_hook(__FILE__, [$this, 'check_woocommerce_before_activation']);
        register_deactivation_hook(__FILE__, [$this, 'meshulam_plugin_deactive_hook']);
        add_action('admin_init', [$this, 'check_environment']);
        add_filter('plugin_action_links_' . plugin_basename(__FILE__), [$this, 'plugin_action_links']);
        add_action('plugins_loaded', [$this, 'init']);
        add_action('woocommerce_api_verify_meshulam_account', [$this, 'verify_meshulam_account_handler']);
        add_action('woocommerce_api_meshulam_plugin_update_notice', [$this, 'meshulam_send_update_notice']);
        add_filter('site_transient_update_plugins', [$this, 'meshulam_pay_push_update']);
        add_action('upgrader_process_complete', [$this, 'meshulam_pay_after_update'], 10, 2);
    }

    function check_woocommerce_before_activation() {
        if (!class_exists('WooCommerce')) {
            deactivate_plugins(plugin_basename(__FILE__));
            wp_die('This plugin requires WooCommerce to be installed and active.');
        }
    }

    public function meshulam_insert_loader_checkout_page()
    {
        if (is_checkout()) {
            echo '<div class="main_meshulam_loader"><div class="meshulam_loader"><div class="inside_loader"></div></div></div>';
        }
    }

    public function meshulam_plugin_deactive_hook()
    {
        $user_access_key = get_option('meshulam_payment_user_access_key') ? get_option('meshulam_payment_user_access_key') : '';
        $user_email = get_option('meshulam_payment_user_email') ? get_option('meshulam_payment_user_email') : '';
        $return_url = str_replace(['http:', 'https:'], '', home_url());
        $args = array(
            'method' => 'POST',
            'timeout' => 120,
            'headers' => array(),
            'body' => array(
                'email' => $user_email,
                'access_key' => $user_access_key,
                'return_url' => $return_url,
            ),
        );
        // print_r($args);exit;
        $response = wp_remote_post('https://meshulamplugin.co.il/new_dashboard/index.php/admin/deactivate_plugin', $args);
    }

    public function display_admin_notice($value = '')
    {
        # code...
    }

    public function meshulam_send_update_notice()
    {
        $remote = wp_remote_get('https://meshulamplugin.co.il/plugin-info/info-bit.json', array(
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'timeout' => 220,
            'headers' => array(
                'Accept' => 'application/json',
            )
        ));
        if (!is_wp_error($remote) && isset($remote['response']['code']) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
            set_transient('meshulam_pay_upgrade_meshulam-payment-gateway', $remote, 14400); // 4 hours cache
        }
        if ($remote) {
            if (!is_wp_error($remote)) {
                $remote = json_decode($remote['body']);
                // your installed plugin version should be on the line below! You can obtain it dynamically of course
                if ($remote && version_compare(MESHULAM_VERSION, $remote->version, '<') && version_compare($remote->requires, get_bloginfo('version'), '<')) {
                    $res = new stdClass();
                    $res->slug = 'meshulam-payment-gateway';
                    $res->plugin = 'meshulam-payment-gateway/meshulam-payment-gateway.php'; // it could be just meshulam-payment-gateway.php if your plugin doesn't have its own directory
                    $res->new_version = $remote->version;
                    $res->tested = $remote->tested;
                    $res->package = $remote->download_url;
                    $res->url = $remote->homepage;
                    $transient->response[$res->plugin] = $res;
                    return $transient;
                }
            }
        }
    }

    public function meshulam_pay_push_update($transient)
    {

        if ( empty( $transient->checked ) ) {
            return $transient;
        }

        if (false == $remote = get_transient('meshulam_pay_upgrade_meshulam-payment-gateway')) {
            $this->update_data_from_dashboard();

            // info.json is the file with the actual plugin information on your server
            $remote = wp_remote_get('https://meshulamplugin.co.il/plugin-info/info-bit.json', array(
                'redirection' => 5,
                'httpversion' => '1.0',
                'blocking' => true,
                'timeout' => 220,
                'headers' => array(
                    'Accept' => 'application/json',
                )
            ));
            if (!is_wp_error($remote) && isset($remote['response']['code']) && $remote['response']['code'] == 200 && !empty($remote['body'])) {
                set_transient('meshulam_pay_upgrade_meshulam-payment-gateway', $remote, 14400); // 4 hours cache
            }
        }
        if ($remote) {
            if (!is_wp_error($remote)) {
                $remote = json_decode($remote['body']);
                // your installed plugin version should be on the line below! You can obtain it dynamically of course
                if ($remote && version_compare(MESHULAM_VERSION, $remote->version, '<') && version_compare($remote->requires, get_bloginfo('version'), '<')) {
                    $res = new stdClass();
                    $res->slug = 'meshulam-payment-gateway';
                    $res->plugin = 'meshulam-payment-gateway/meshulam-payment-gateway.php'; // it could be just meshulam-payment-gateway.php if your plugin doesn't have its own directory
                    $res->new_version = $remote->version;
                    $res->tested = $remote->tested;
                    $res->package = $remote->download_url;
                    $res->url = $remote->homepage;
                    $transient->response[$res->plugin] = $res;
                }
            }
        }
        return $transient;
    }
    public function meshulam_pay_after_update($upgrader_object, $options)
    {
        if ($options['action'] == 'update' && $options['type'] === 'plugin') {
            // just clean the cache when new plugin version is installed
            delete_transient('meshulam_pay_upgrade_meshulam-payment-gateway');
            $this->update_data_from_dashboard();
        }
    }

    public function update_data_from_dashboard()
    {
        $logger = wc_get_logger();
        $user_access_key = get_option('meshulam_payment_user_access_key');
        $user_email = get_option('meshulam_payment_user_email');
        $return_url = str_replace(['http:', 'https:'], '', home_url());
        $args = array(
            'method' => 'POST',
            'timeout' => 120,
            'headers' => array(),
            'body' => array(
                'email' => $user_email,
                'access_key' => $user_access_key,
                'return_url' => $return_url,
                'plugin_version' => MESHULAM_VERSION,
            ),
        );
        $response = wp_remote_post('https://meshulamplugin.co.il/new_dashboard/index.php/admin/update_plugin_data_client', $args);

        if (!is_wp_error($response)) {
            $res = json_decode($response['body'], true);

            $logger->add('grow_wallet_api_data_response', 'API Response: ' . print_r($res, true));

            $status = $res['status'];
            if ($status == '0') {
                $type = 'error';
                update_option('meshulam_bit_payment_code', '');
                update_option('meshulam_bit_payment_status', '');
                update_option('bitpay_payment_status', '');
                update_option('meshulam_apple_payment_status', '');
                update_option('meshulam_googlepay_payment_status', '');
                update_option('meshulam_cal_payment_status', '');
                update_option('meshulam_manage_recurring', '');
                update_option('grow_wallet_payment_status', '');
            } else {
                $code = $res['code'];
                $pagecodes = $res['pagecodes'];
                $meshulam_regular_live_pagecode = $pagecodes['meshulam_regular']['live_pagecode'];
                $meshulam_regular_test_pagecode = $pagecodes['meshulam_regular']['test_pagecode'];
                $meshulam_recurring_live_pagecode = $pagecodes['meshulam_recurring']['live_pagecode'];
                $meshulam_recurring_test_pagecode = $pagecodes['meshulam_recurring']['test_pagecode'];
                $meshulam_bit_live_pagecode = $pagecodes['bit_payment']['live_pagecode'];
                $meshulam_bit_test_pagecode = $pagecodes['bit_payment']['test_pagecode'];
                $meshulam_apple_live_pagecode = $pagecodes['apple_payment']['live_pagecode'];
                $meshulam_apple_test_pagecode = $pagecodes['apple_payment']['test_pagecode'];
                $meshulam_cal_live_pagecode = $pagecodes['cal_payment']['live_pagecode'];
                $meshulam_cal_test_pagecode = $pagecodes['cal_payment']['test_pagecode'];
                $meshulam_googlepay_live_pagecode = $pagecodes['googlepay_payment']['live_pagecode'];
                $meshulam_googlepay_test_pagecode = $pagecodes['googlepay_payment']['test_pagecode'];
                $meshulam_grow_wallet_live_pagecode = $pagecodes['grow_wallet_payment']['live_pagecode'];
                $meshulam_grow_wallet_test_pagecode = $pagecodes['grow_wallet_payment']['test_pagecode'];
                $meshulam_grow_wallet_recurring_live_pagecode = $pagecodes['grow_wallet_recurring']['live_pagecode'];
                $meshulam_grow_wallet_recurring_test_pagecode = $pagecodes['grow_wallet_recurring']['test_pagecode'];

                $type = 'success';
                update_option('meshulam_payment_user_access_key', $user_access_key);
                update_option('meshulam_payment_user_email', $user_email);
                update_option('meshulam_bit_payment_code', $code);
                update_option('bitpay_payment_code', $code);
                if ($res['bit_status'] == '1') {
                    update_option('bitpay_payment_status', '1');
                } else {
                    update_option('bitpay_payment_status', '');
                }
                if ($res['sdk_status'] == '1') {
                    update_option('grow_wallet_payment_status', '1');
                } else {
                    update_option('grow_wallet_payment_status', '');
                }

                if ($res['sdk_credit_card'] == '1') {
                    update_option('sdk_credit_card', '1');
                } else {
                    update_option('sdk_credit_card', '');
                }

                if ($res['sdk_bit'] == '1') {
                    update_option('sdk_bit', '1');
                } else {
                    update_option('sdk_bit', '');
                }

                if ($res['sdk_apple'] == '1') {
                    update_option('sdk_apple', '1');
                } else {
                    update_option('sdk_apple', '');
                }

                if ($res['sdk_google'] == '1') {
                    update_option('sdk_google', '1');
                } else {
                    update_option('sdk_google', '');
                }

                if ($res['manage_recurring'] == '1') {
                    update_option('meshulam_manage_recurring', '1');
                } else {
                    update_option('meshulam_manage_recurring', '');
                }
                if ($res['apple_status'] == '1') {
                    update_option('meshulam_apple_payment_status', '1');
                } else {
                    update_option('meshulam_apple_payment_status', '');
                }
                if ($res['cal_status'] == '1') {
                    update_option('meshulam_cal_payment_status', '1');
                } else {
                    update_option('meshulam_cal_payment_status', '');
                }
                if ($res['googlepay_status'] == '1') {
                    update_option('meshulam_googlepay_payment_status', '1');
                } else {
                    update_option('meshulam_googlepay_payment_status', '');
                }
                if ($res['recurring_status'] == '1') {
                    update_option('meshulam_recurring_payment_status', '1');
                } else {
                    update_option('meshulam_recurring_payment_status', '');
                }
                if ($res['regular_status'] == '1') {
                    update_option('meshulam_bit_payment_status', '1');
                } else {
                    update_option('meshulam_bit_payment_status', '');
                }
                if ($res['refund_status'] == '1') {
                    update_option('meshulam_refund_status', '1');
                } else {
                    update_option('meshulam_refund_status', '');
                }
                if ($res['j5_status'] == '1') {
                    update_option('meshulam_j5_status', '1');
                } else {
                    update_option('meshulam_j5_status', '');
                }
                if ($res['j4_status'] == '1') {
                    update_option('meshulam_force_regular_payment', '1');
                } else {
                    update_option('meshulam_force_regular_payment', '');
                }
                update_option('meshulam_regular_live_pagecode', $meshulam_regular_live_pagecode);
                update_option('meshulam_regular_test_pagecode', $meshulam_regular_test_pagecode);
                update_option('meshulam_recurring_live_pagecode', $meshulam_recurring_live_pagecode);
                update_option('meshulam_recurring_test_pagecode', $meshulam_recurring_test_pagecode);
                update_option('meshulam_bit_live_pagecode', $meshulam_bit_live_pagecode);
                update_option('meshulam_bit_test_pagecode', $meshulam_bit_test_pagecode);
                update_option('meshulam_apple_live_pagecode', $meshulam_apple_live_pagecode);
                update_option('meshulam_apple_test_pagecode', $meshulam_apple_test_pagecode);
                update_option('meshulam_cal_live_pagecode', $meshulam_cal_live_pagecode);
                update_option('meshulam_cal_test_pagecode', $meshulam_cal_test_pagecode);
                update_option('meshulam_googlepay_live_pagecode', $meshulam_googlepay_live_pagecode);
                update_option('meshulam_googlepay_test_pagecode', $meshulam_googlepay_test_pagecode);
                update_option('meshulam_grow_wallet_live_pagecode', $meshulam_grow_wallet_live_pagecode);
                update_option('meshulam_grow_wallet_test_pagecode', $meshulam_grow_wallet_test_pagecode);
                update_option('meshulam_grow_wallet_recurring_live_pagecode', $meshulam_grow_wallet_recurring_live_pagecode);
                update_option('meshulam_grow_wallet_recurring_test_pagecode', $meshulam_grow_wallet_recurring_test_pagecode);
            }
        }
    }

    public function check_environment()
    {
        $user_id = get_current_user_id();
        if (isset($_GET['meshulam-notice-dismissed'])) :
            add_user_meta($user_id, 'meshulam_notice_dismissed', 'true', true);
        endif;

        if (is_admin() && current_user_can('activate_plugins') && !is_plugin_active('woocommerce/woocommerce.php')) {
            $message = __('This plugin requires the plugin - <a href="https://wordpress.org/plugins/woocommerce/" target="_blank">WooCommerce</a> to be active.', 'meshulam');
            $this->add_admin_notice('error', $message);
            // Deactivate the plugin
            // deactivate_plugins( __FILE__ );
            // return;
        }
        $php_version = phpversion();
        $required_php_version = '5.4';
        if (version_compare($required_php_version, $php_version, '>')) {
            $message = sprintf(__('Your server is running PHP %1$s, some features require PHP %2$s at least.', 'meshulam'), $php_version, $required_php_version);
            $this->add_admin_notice('warning', $message);
        }
    }

    public function add_admin_notice($type, $message)
    {
        $this->notices[] = [
            'class' => "notice notice-$type is-dismissible",
            'message' => $message,
        ];
    }

    public static function admin_notices($notice = false)
    {
        $output = '';
        $title = __('Meshulam Payment Gateway', 'meshulam-payment-gateway');
        $msg = __($notice['message'], 'meshulam-payment-gateway');
        if ($notice) {
            $output .= "<div class='$notice[class]'><p><b>$title:</b> $msg</p></div>";
        }
        echo $output;
    }

    public static function plugin_action_links($links)
    {
        $action_links = [
            'settings' => '<a href="' . admin_url('admin.php?page=wc-settings&tab=checkout&section=meshulam-payment') . '" aria-label="' . __('View Meshulam Payment settings', 'meshulam') . '">' . __('Settings') . '</a>',
        ];
        $links = array_merge($action_links, $links);
        return $links;
    }

    public function meshulam_general_admin_notice()
    {
        echo '<div class="error"><p>Meshulam payment gateway Requires Woocommere to be active.</p></div>';
    }

    public function meshulam_check_cron_enabled_notice()
    {

        $user_id = get_current_user_id();
        if (!get_user_meta($user_id, 'meshulam_notice_dismissed')) :
            $current_url = wc_get_current_admin_url();
            $location = add_query_arg('meshulam-notice-dismissed', 'true', $current_url);
            echo '<div class="notice notice-warning" style="position:relative"><p>Meshulam payment gateway Requires WP Cron and it is disabled.</p><a href="' . $location . '" class="notice-dismiss"></a></div>';
        endif;
    }

    public function init()
    {
        load_plugin_textdomain('meshulam', false, dirname(plugin_basename(__FILE__)) . '/languages');
        if (!class_exists('WooCommerce')) {
            add_action('admin_notices', [$this, 'meshulam_general_admin_notice']);
        } else {
            if (defined('DISABLE_WP_CRON') && DISABLE_WP_CRON) {
                add_action('admin_notices', [$this, 'meshulam_check_cron_enabled_notice']);
            }

            include_once MESHULAM_PLUGIN_DIR . '/inc/mobiledetect.class.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_checkout_validation.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_discount_fixes.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam_gateway.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam_grow_wallet.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam_admin.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam_scripts.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam-woocommerce-product.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam-before-add-to-cart.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_bit_gateway.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_apple_gateway.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_cal_gateway.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_googlepay_gateway.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_bit_scripts.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/cron_check_paymentinfo.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/main_cron_check_daily.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam_custom_fail_page.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam-checkout-popup.php';
            include_once MESHULAM_PLUGIN_DIR . '/inc/wc_meshulam-recurring-module.php';
            load_plugin_textdomain('meshulam-payment-gateway', false, dirname(plugin_basename(__FILE__)) . '/languages');
            add_filter('woocommerce_payment_gateways', [$this, 'add_meshulam_gateway']);
            add_filter('woocommerce_available_payment_gateways', [$this, 'check_grow_walleton_hide_other_payments']);
            //add random user agent to prevent block url
            add_filter('wp_headers', [$this, 'add_vary_header'], 10, 2);
            add_filter('http_request_args', [$this, 'useCustomUserAgent'], 10, 2);
            add_action('wp_footer', [$this, 'meshulam_insert_loader_checkout_page']);
            //echo get_option('bitpay_payment_status');exit;

            //trying to store some options
            if (get_option('bitpay_payment_code') == '') {
                $user_access_key = get_option('meshulam_payment_user_access_key') ? get_option('meshulam_payment_user_access_key') : '';
                $user_email = get_option('meshulam_payment_user_email') ? get_option('meshulam_payment_user_email') : '';
                $this->update_data_from_dashboard();
                //verifyAccountMeshulampaymentPlugin($user_email, $user_access_key);
            }
            //add_action('admin_notices', [new AdminNotice(), 'displayAdminNotice']);
        }
    }

    public function add_vary_header($headers)
    {
        $headers['user_agent'] = 'Mozilla/5.0 (Windows; U; Windows NT 6.3; en-GB; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3';
        return $headers;
    }

    public function useCustomUserAgent(array $args, $url)
    {
        $args['user_agent'] = 'Mozilla/5.0 (Windows; U; Windows NT 6.3; en-GB; rv:1.9.0.3) Gecko/2008092417 Firefox/3.0.3';
        return $args;
    }

    public function check_grow_walleton_hide_other_payments($available_gateways)
    {
        if (isset($available_gateways['grow-wallet-payment'])) {
            unset($available_gateways['meshulam-payment']);
            unset($available_gateways['apple-payment']);
            unset($available_gateways['cal-payment']);
            unset($available_gateways['bitpay-payment']);
            unset($available_gateways['googlepay-payment']);
        }
        return $available_gateways;
    }

    public function add_meshulam_gateway($methods)
    {
        if (get_option('grow_wallet_payment_status') == '1') {
            $methods[] = 'WC_Grow_Wallet_Gateway';
        }
        if (get_option('meshulam_bit_payment_status') == '1') {
            $methods[] = 'WC_MeshulamPay_Gateway';
        }
        if (get_option('bitpay_payment_status') == '1') {
            $methods[] = 'WC_BitPay_Meshulam_Gateway';
        }
        if (get_option('meshulam_apple_payment_status') == '1') {
            $methods[] = 'WC_Apple_Meshulam_Gateway';
        }
        if (get_option('meshulam_cal_payment_status') == '1') {
            $methods[] = 'WC_Cal_Meshulam_Gateway';
        }
        if (get_option('meshulam_googlepay_payment_status') == '1') {
            $methods[] = 'WC_GooglePay_Meshulam_Gateway';
        }
        return $methods;
    }

    public function verify_meshulam_account_handler()
    {
        $this->update_data_from_dashboard();
    }
}

add_filter('template_include', 'contact_page_template', 99);
function contact_page_template($template)
{
    $file_name = 'order_fail_meshulam.php';
    $url_path = trim(parse_url(add_query_arg(array()), PHP_URL_PATH), '/');
    if (strpos($url_path, 'order_fail_meshulam') !== false) {
        global $wp_query;
        $wp_query->is_404 = false;
        status_header(200);
        if (locate_template($file_name)) {
            $template = locate_template($file_name);
        } else {
            remove_action('woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0);
            $template = MESHULAM_PLUGIN_DIR . '/inc/' . $file_name;
        }
    }
    return $template;
}

WC_Meshulam::get_instance();