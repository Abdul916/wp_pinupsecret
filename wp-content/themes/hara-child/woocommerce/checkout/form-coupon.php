<?php
/**
 * Checkout coupon form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/form-coupon.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woo.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

if ( ! wc_coupons_enabled() ) { // @codingStandardsIgnoreLine.
	return;
}

?>
<div class="woocommerce-form-coupon-toggle">
	<?php wc_print_notice( apply_filters( 'woocommerce_checkout_coupon_message', esc_html__( 'هل لديك قسيمة؟', 'hara' ) . ' <a href="#" class="showcoupon">' . esc_html__( 'انقر هنا لإدخال الرمز الخاص بك', 'hara' ) . '</a>' ), 'notice' ); ?>


	<form class="checkout_coupon woocommerce-form-coupon" method="post" style="display:none">

		<p><?php esc_html_e( 'إذا كان لديك رمز قسيمة، يرجى تطبيقه أدناه.', 'hara' ); ?></p>

		<p class="form-row form-row-first">
			<label for="coupon_code" class="screen-reader-text"><?php esc_html_e( 'القسيمة:', 'hara' ); ?></label>
			<input type="text" name="coupon_code" class="input-text" placeholder="<?php esc_attr_e( 'رمز الكوبون', 'hara' ); ?>" id="coupon_code" value="" />
		</p>

		<p class="form-row form-row-last">
			<button type="submit" class="button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" name="apply_coupon" value="<?php esc_attr_e( 'Apply coupon', 'hara' ); ?>"><?php esc_html_e( 'تطبيق القسيمة', 'hara' ); ?></button>
		</p>

		<div class="clear"></div>
	</form>

</div>