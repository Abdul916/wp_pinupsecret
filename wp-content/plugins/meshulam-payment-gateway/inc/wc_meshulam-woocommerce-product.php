<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

if ((get_option('meshulam_bit_payment_status') == 1)) {
    $check_availability = array();
    if (get_option('woocommerce_meshulam-payment_settings')) {
        $check_availability = !empty(get_option('woocommerce_meshulam-payment_settings')['payment_type']) ? get_option('woocommerce_meshulam-payment_settings')['payment_type'] : [];
        if (!is_array($check_availability)) {
            $check_availability = array();
        }
    }
    if (in_array("direct_debit_2", $check_availability)) {
        add_filter('product_type_options', 'Add_Meshulam_ProductType', 99, 5);
        function Add_Meshulam_ProductType($ProductTypeOptions)
        {
            global $post;
            $Value = get_post_meta($post->ID, 'meshulam_recurring', true) ? get_post_meta($post->ID, 'meshulam_recurring', true) : 'no';
            $unlimited_check = get_post_meta($post->ID, '_meshulam_checkbox_field', true);
            $recuriing_numbers = get_post_meta($post->ID, '_meshulam_pay_field', true);
            if ($unlimited_check == 'yes' || $recuriing_numbers > 0) {
                $Value = 'yes';
            }
            $ProductTypeOptions['meshulam-payment-gateway'] = array(
                'id' => 'meshulam_recurring',
                'label' => __('Meshulam Recurring', 'meshulam-payment-gateway'),
                'description' => __('Recurring product/service.', 'meshulam-payment-gateway'),
                'default' => $Value,
            );
            return $ProductTypeOptions;
        }

        add_filter('woocommerce_product_data_tabs', 'add_meshulam_pay_product_data_tab', 99, 5);
        function add_meshulam_pay_product_data_tab($product_data_tabs)
        {
            $product_data_tabs['meshulam-installment-tab'] = array(
                'label' => __('Meshulam Recurring', 'meshulam-payment-gateway'),
                'target' => 'meshulam_pay_product_data',
            );
            return $product_data_tabs;
        }

        add_action('woocommerce_product_data_panels', 'add_meshulam_pay_product_data_fields');
        function add_meshulam_pay_product_data_fields()
        {
            global $woocommerce, $post;
            ?>
<!--id below must match target registered in above add_meshulam_pay_product_data_tab function-->
<div id="meshulam_pay_product_data" class="panel woocommerce_options_panel">
	<?php
woocommerce_wp_checkbox(array(
                'id' => '_meshulam_checkbox_field',
                'wrapper_class' => 'show_if_simplea',
                'label' => __('', 'meshulam-payment-gateway'),
                'description' => __('Make it unlimited Recurring payment', 'meshulam-payment-gateway'),
                'desc_tip' => false,
                'type' => 'checkbox',
            ));

            // Get the checkbox value
            $checkbox = get_post_meta($post->ID, '_meshulam_checkbox_field', true);

            if ($checkbox == 'yes') {
                $readonly = 'readonly';
                $text_ = 'text';
                $default = __(' ', 'meshulam-payment-gateway');
                update_post_meta($post->ID, '_meshulam_pay_field', $default);
            } else {
                $text_ = 'number';
                $readonly = '';
            }

            woocommerce_wp_text_input(array(
                'id' => '_meshulam_pay_field',
                'wrapper_class' => 'show_if_simplea',
                'label' => __('Meshulam Recurring payment Period', 'meshulam-payment-gateway'),
                'placeholder' => __('Number of payment', 'meshulam-payment-gateway'),
                'description' => __('Number should be greater than 2', 'meshulam-payment-gateway'),
                'default' => '2',
                'desc_tip' => false,
                'type' => $text_,
                'custom_attributes' => array(
                    'step' => 'any',
                    'min' => '2',
                    'max' => '180',
                    $readonly => $readonly,
                ),
            ));
            ?>
</div>
<?php }
        add_action('woocommerce_process_product_meta', 'woocommerce_process_product_meta_fields_save');
        function woocommerce_process_product_meta_fields_save($post_id)
        {
            // This is the case to save custom field data of checkbox. You have to do it as per your custom fields
            update_post_meta($post_id, 'meshulam_recurring', isset($_POST['meshulam_recurring']) ? 'yes' : 'no');
            update_post_meta($post_id, '_meshulam_checkbox_field', $_POST['_meshulam_checkbox_field']);

            if (isset($_POST['_meshulam_pay_field'])) {
                update_post_meta($post_id, '_meshulam_pay_field', $_POST['_meshulam_pay_field']);
            }

        }

        function meshulam_installments_woocommerce_before_add_to_cart_form()
        {
            global $woocommerce, $post, $wpdb;
            //  $m_val =  get_post_meta( get_the_ID() , '_meshulam_pay_field' , true);
            $m_val = "";
            if (!empty($m_val)) {
                echo '<p>' . $m_val . ' ' . __('Installments available with Meshulam Recurring payment Payment', 'meshulam-payment-gateway') . '</p>';?>
<!--<a href="<?php $add_to_cart = do_shortcode('[add_to_cart_url id="' . $post->ID . '"]');
                echo $add_to_cart;?>" class="more">Buy now</a>-->
<a href="javascript:void(0)" class="button alt more_buy"><?php echo __('Buy Now With Installments', 'meshulam-payment-gateway'); ?></a>

<script>
	jQuery(document).on('click','.more_buy',function(){
		var product_id = <?php echo $post->ID; ?>;
		var quantity = jQuery('.single-product div.product .summary .qty').val();
		jQuery.ajax({
			type: "POST",
			url: '<?php echo admin_url('admin-ajax.php'); ?>',
			data: {action : 'remove_item_from_cart',product_id : product_id,quantity:quantity},
			success: function (res) {
				console.log(res);
				if(res == 0){
					window.location.href = '<?php echo home_url(); ?>/cart/';
				}
			}
		})
	})
</script>
<?php
}
        }
        add_action('woocommerce_before_add_to_cart_form', 'meshulam_installments_woocommerce_before_add_to_cart_form');
    }

    add_action('wp_ajax_remove_item_from_cart', 'meshulam_remove_item_from_cart');
    add_action('wp_ajax_nopriv_remove_item_from_cart', 'meshulam_remove_item_from_cart');

    function meshulam_remove_item_from_cart()
    {
        global $woocommerce;
        $woocommerce->cart->empty_cart();
        $product_id = $_POST['product_id'];
        $quantity = $_POST['quantity'];
        if ($product_id) {
            WC()->cart->add_to_cart($product_id, $quantity);
            echo 0;
        }
        exit();

    }
}
