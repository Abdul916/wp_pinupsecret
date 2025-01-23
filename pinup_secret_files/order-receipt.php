<?php
/**
 * Checkout Order Receipt Template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/checkout/order-receipt.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 3.2.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>

<ul class="order_details">
	<li class="order">
		<?php esc_html_e( 'رقم الأمر:', 'woocommerce' ); ?>
		<strong><?php echo esc_html( $order->get_order_number() ); ?></strong>
	</li>
	<li class="date">
		<?php esc_html_e( 'تاريخ:', 'woocommerce' ); ?>
		<!-- <strong><?php // echo esc_html( wc_format_datetime( $order->get_date_created() ) ); ?></strong> -->
		<strong><?php echo esc_html( get_arabic_order_date( $order->get_date_created() ) ); ?></strong>
	</li>
	<li class="total">
		<?php esc_html_e( 'المجموع:', 'woocommerce' ); ?>
		<strong><?php echo wp_kses_post( $order->get_formatted_order_total() ); ?></strong>
	</li>
	<?php if ( $order->get_payment_method_title() ) : ?>
	<li class="method">
	<?php esc_html_e( 'طريقة الدفع :', 'woocommerce' ); ?>
		
		<strong>
			<?php
			$cash_method = wp_kses_post( $order->get_payment_method_title() );
			if($cash_method == 'Cash On Delivery'){
				echo "  الدفع عند الاستلام  ";
			}else{
				echo $cash_method;
			}
			?>
		</strong>
	</li>
	<?php endif; ?>
</ul>

<?php do_action( 'woocommerce_receipt_' . $order->get_payment_method(), $order->get_id() ); ?>

<div class="clear"></div>
