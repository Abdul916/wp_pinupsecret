<?php
/**
 * Display the Customer History metabox.
 *
 * This template is used to display the customer history metabox on the edit order screen.
 *
 * @see     Automattic\WooCommerce\Internal\Admin\Orders\MetaBoxes\CustomerHistory
 * @package WooCommerce\Templates
 * @version 8.7.0
 */

declare( strict_types=1 );

defined( 'ABSPATH' ) || exit;

/**
 * Variables used in this file.
 *
 * @var int   $orders_count   The number of paid orders placed by the current customer.
 * @var float $total_spend   The total money spent by the current customer.
 * @var float $avg_order_value The average money spent by the current customer.
 */
?>

<div class="customer-history order-attribution-metabox">
	<h4>
		<?php
		esc_html_e( 'إجمالي الطلبات', 'woocommerce' );
		echo wp_kses_post(
			wc_help_tip(
				__( 'إجمالي عدد الطلبات غير الملغاة وغير الفاشلة لهذا العميل، بما في ذلك الطلب الحالي.', 'woocommerce' )
			)
		);
		?>
	</h4>

	<span class="order-attribution-total-orders">
		<?php echo esc_html( $orders_count ); ?>
	</span>

	<h4>
		<?php
		esc_html_e( 'إجمالي الإيرادات', 'woocommerce' );
		echo wp_kses_post(
			wc_help_tip(
				__( "هذه هي القيمة الدائمة للعميل، أو المبلغ الإجمالي الذي ربحته من طلبات هذا العميل.", 'woocommerce' )
			)
		);
		?>
	</h4>
	<span class="order-attribution-total-spend">
		<?php echo wp_kses_post( wc_price( $total_spend ) ); ?>
	</span>

	<h4><?php esc_html_e( 'متوسط ​​قيمة الطلب', 'woocommerce' ); ?></h4>
	<span class="order-attribution-average-order-value">
		<?php echo wp_kses_post( wc_price( $avg_order_value ) ); ?>
	</span>
</div>
