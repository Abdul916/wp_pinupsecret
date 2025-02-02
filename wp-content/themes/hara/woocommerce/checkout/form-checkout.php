<?php
/**
 * Checkout Form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-checkout.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.5.0
 */

if (! defined('ABSPATH')) {
    exit;
}
?>
<div class="wrapper-login-coupon">
	<?php do_action('woocommerce_before_checkout_form', $checkout); ?>
</div>
	
<?php


// If checkout registration is disabled and not logged in, the user cannot checkout.
if (! $checkout->is_registration_enabled() && $checkout->is_registration_required() && ! is_user_logged_in()) {
    echo esc_html(apply_filters('woocommerce_checkout_must_be_logged_in_message', esc_html__('You must be logged in to checkout.', 'hara')));
    return;
}

$class_checkout = 'checkout woocommerce-checkout row';

if (class_exists('WooCommerce_Germanized')) {
    $class_checkout .= ' wc-germanized'; 
}

$class_review = '';
if ( !is_user_logged_in() && 'yes' === get_option( 'woocommerce_enable_checkout_login_reminder' ) ) {
	$class_review .= ' is-login';
}

if ( wc_coupons_enabled() ) { 
	$class_review .= ' is-coupons';
}

?>

<form name="checkout" method="post" class="<?php echo esc_attr($class_checkout); ?>" action="<?php echo esc_url(wc_get_checkout_url()); ?>" enctype="multipart/form-data">

	<?php if ($checkout->get_checkout_fields()) : ?>
	<div class="billing-wrapper col-12 col-lg-6 col-xl-6">	
		<?php do_action('woocommerce_checkout_before_customer_details'); ?>

		<div class="col2-set" id="customer_details">
			<div class="col-1">
				
				<?php do_action('woocommerce_checkout_billing'); ?>
			</div>

			<div class="col-2">
				<?php do_action('woocommerce_checkout_shipping'); ?>
			</div>
		</div>

		<?php do_action('woocommerce_checkout_after_customer_details'); ?>
 
	</div>
	<?php endif; ?> 
	<div class="review-wrapper col-12 col-lg-6 col-xl-6 <?php echo esc_attr($class_review); ?>">
		<div class="order-review">
			<h3 id="order_review_heading"><?php esc_html_e('Your order', 'hara'); ?></h3>

			<?php do_action('woocommerce_checkout_before_order_review'); ?>

			<div id="order_review" class="woocommerce-checkout-review-order <?php echo (hara_compatible_checkout_order()) ? 'compatible-checkout' : '';  ?>">
				<?php do_action('woocommerce_checkout_order_review'); ?>
			</div>
		</div>

		<?php if (!hara_compatible_checkout_order()) : ?>
			<div class="order-payment">
				<h3 id="order_payment_heading"><?php esc_html_e('Payment method', 'hara'); ?></h3>
				<?php do_action('woocommerce_checkout_after_order_review'); ?>
			</div>
		<?php endif; ?>

	</div>
</form>

<?php do_action('woocommerce_after_checkout_form', $checkout); ?>
