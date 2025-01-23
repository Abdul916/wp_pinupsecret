<?php
function meshulam_options_page()
{

    add_menu_page(
        'grow Pay',
        'grow Pay',
        'manage_options',
        'meshulam-payment-setting',
        'meshulam_options_page_html',
        MESHULAM_PLUGIN_URL . 'assets/images/logo_icon.png',
        20

    );
}

add_action('admin_menu', 'meshulam_options_page');

add_action('admin_init', 'meshulam_plugin_settings');
function meshulam_plugin_settings()
{
    //register our settings
    register_setting('meshulam_settings_group', 'meshulam_payment_user_email');
    register_setting('meshulam_settings_group', 'meshulam_payment_user_access_key');
}

function meshulam_options_page_html()
{
    settings_errors('meshulam_settings_group');
    ?>

	<div class="wrap meshulam_">
		<h2><?php _e('grow payment gateway', 'meshulam-payment-gateway');?></h2>
		<div class="payment_tab" id="meshulam">
			<form method="post" id="mainform" action="options.php" enctype="multipart/form-data">
				<?php settings_fields('meshulam_settings_group');?>
				<?php do_settings_sections('meshulam_settings_group');?>
				<div class="meshulam_wrapper">
					<table class="form-table">
						<tbody>
							<tr valign="top">
								<th scope="row" class="titledesc">
									<label for="meshulam_payment_user_access_key"><?php _e('Licence key', 'meshulam-payment-gateway');?></label>
								</th>
								<td>
									<input type="text" name="meshulam_payment_user_access_key" id="meshulam_payment_user_access_key" value="<?php echo esc_attr(get_option('meshulam_payment_user_access_key')); ?>" required>
									<span class="description">
										<?php _e('Licence Key', 'meshulam-payment-gateway');?>
									</span>
								</td>
							</tr>
							<tr valign="top">
								<th scope="row" class="titledesc">
									<label for="meshulam_payment_user_email"><?php _e('Email', 'meshulam-payment-gateway');?></label>
								</th>
								<td>
									<input type="email" name="meshulam_payment_user_email" id="meshulam_payment_user_email" value="<?php echo esc_attr(get_option('meshulam_payment_user_email')); ?>" required>
									<span class="description">
										<?php _e('Register Email ID', 'meshulam-payment-gateway');?>
									</span>
								</td>

							</tr>
							<tr>
								<td colspan="2">
									<input type="hidden" name="meshulam_payment_user_response" value="<?php echo esc_attr(get_option('meshulam_payment_user_response')); ?>">
								</td>
							</tr>
						</tbody>
					</table>
					<?php submit_button();?>
				</div>
			</form>
		</div>
	</div>

<?php }

add_action('admin_init', function () {
    if (isset($_REQUEST['page']) && $_REQUEST['page'] == 'meshulam-payment-setting' && isset($_REQUEST['settings-updated']) && $_REQUEST['settings-updated'] == 'true') {
        $user_access_key = get_option('meshulam_payment_user_access_key');
        $user_email = get_option('meshulam_payment_user_email');
        if (!is_email($user_email) || empty($user_access_key)) {
            add_settings_error(
                'meshulam_settings_group',
                'error',
                __('Please submit email and access key', 'meshulam'),
                'error'
            );
            return;
        }

        $return_url = str_replace(['http:', 'https:'], '', home_url());
        $args = array(
            'method' => 'POST',
            'timeout' => 120,
            'sslverify' => false,
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
            $status = $res['status'];
            if ($status == '0') {
                $type = 'error';
                update_option('meshulam_bit_payment_code', '');
                update_option('meshulam_bit_payment_status', '');
                update_option('bitpay_payment_status', '');
                update_option('meshulam_apple_payment_status', '');
                update_option('meshulam_apple_payment_status', '');
                update_option('meshulam_cal_payment_status', '');
                update_option('meshulam_googlepay_payment_status', '');
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
                if ($res['manage_recurring'] == '1') {
                    update_option('meshulam_manage_recurring', '1');
                } else {
                    update_option('meshulam_manage_recurring', '');
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
            if ('success' != $res['message']) {
                add_settings_error(
                    'meshulam_settings_group',
                    'error',
                    __($res['message'], 'meshulam-payment-gateway'),
                    'error'
                );
                return;
            }

        } else {
            add_settings_error(
                'meshulam_settings_group',
                'error',
                __('החיבור נכשל נא לפנות לחברת השרתים ולבדוק למה ישנה חסימה', 'meshulam-payment-gateway'),
                'error'
            );
            return;
        }
        add_settings_error(
            'meshulam_settings_group',
            'error',
            __('Settings saved.'),
            'success'
        );
    }

}, 99);

//creating custom column in order list of admin for show pdf icon
add_filter('manage_edit-shop_order_columns', 'show_column_meshulam_invoice_odf', 20);
function show_column_meshulam_invoice_odf($columns)
{
    $columns['meshulam-ivoice'] = __('Invoice', 'meshulam-payment-gateway');
    return $columns;
}

// Adding custom fields meta data for each new column (example)
add_action('manage_shop_order_posts_custom_column', 'meshulam_custom_orders_list_column_content', 20, 2);
function meshulam_custom_orders_list_column_content($column, $post_id)
{
    switch ($column) {
        case 'meshulam-ivoice':
            // Get custom post meta data
            $meshulam_invoice_url = get_post_meta($post_id, 'meshulam_invoice_url', true);
            if (!empty($meshulam_invoice_url)) {
                echo '<a href="' . $meshulam_invoice_url . '" target="_blank"><img src="' . MESHULAM_PLUGIN_URL . 'assets/images/pdf.png" height="30"></a>';
            }

            // Testing (to be removed) - Empty value case
            else {
                echo '';
            }

            break;
    }
}

//hook for J5 on and admin change order items we need to set meta and send updated data to meshulam again
add_action('woocommerce_saved_order_items', 'meshulam_changed_order_data_admin');
function meshulam_changed_order_data_admin($order_id)
{
    $order = wc_get_order($order_id);
    if (isset($_POST['order_id']) && isset($_POST['items'])) {
        update_post_meta($order_id, 'order_updated_byadmin_j5', '1');
    }
}