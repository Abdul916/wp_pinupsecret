<?php
/**
 * Order tracking form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/order/form-tracking.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

defined( 'ABSPATH' ) || exit;

global $post;
?>

<form action="<?php echo esc_url( get_permalink( $post->ID ) ); ?>" method="post" class="woocommerce-form woocommerce-form-track-order track_order">

	<?php
	/**
	 * Action hook fired at the beginning of the form-tracking form.
	 *
	 * @since 6.5.0
	 */
	do_action( 'woocommerce_order_tracking_form_start' );
	?>

	<p><?php esc_html_e( 'لتتبع طلبك، يرجى إدخال معرف الطلب الخاص بك في المربع أدناه والضغط على زر "تتبع". لقد تم تقديم هذا لك في إيصالك وفي رسالة التأكيد الإلكترونية التي كان من المفترض أن تتلقاها.', 'woocommerce' ); ?></p>

	<p class="form-row form-row-first"><label for="orderid"><?php esc_html_e( 'رقم التعريف الخاص بالطلب', 'woocommerce' ); ?></label> <input class="input-text" type="text" name="orderid" id="orderid" value="<?php echo isset( $_REQUEST['orderid'] ) ? esc_attr( wp_unslash( $_REQUEST['orderid'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'وجدت في البريد الإلكتروني لتأكيد الطلب الخاص بك.', 'woocommerce' ); ?>" /></p><?php // @codingStandardsIgnoreLine ?>
	<p class="form-row form-row-last"><label for="order_email"><?php esc_html_e( 'Billing email', 'woocommerce' ); ?></label> <input class="input-text" type="text" name="order_email" id="order_email" value="<?php echo isset( $_REQUEST['order_email'] ) ? esc_attr( wp_unslash( $_REQUEST['order_email'] ) ) : ''; ?>" placeholder="<?php esc_attr_e( 'البريد الإلكتروني الذي استخدمته أثناء الخروج.', 'woocommerce' ); ?>" /></p><?php // @codingStandardsIgnoreLine ?>
	<div class="clear"></div>

	<?php
	/**
	 * Action hook fired in the middle of the form-tracking form (before the submit button).
	 *
	 * @since 6.5.0
	 */
	do_action( 'woocommerce_order_tracking_form' );
	?>

	<p class="form-row"><button type="submit" class="button<?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ? ' ' . wc_wp_theme_get_element_class_name( 'button' ) : '' ); ?>" name="track" value="<?php esc_attr_e( 'مسار', 'woocommerce' ); ?>"><?php esc_html_e( 'مسار', 'woocommerce' ); ?></button></p>
	<?php wp_nonce_field( 'woocommerce-order_tracking', 'woocommerce-order-tracking-nonce' ); ?>

	<?php
	/**
	 * Action hook fired at the end of the form-tracking form (after the submit button).
	 *
	 * @since 6.5.0
	 */
	do_action( 'woocommerce_order_tracking_form_end' );
	?>

</form>
