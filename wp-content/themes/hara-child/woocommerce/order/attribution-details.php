<?php
/**
 * Display the Order Attribution details metabox.
 *
 * This template is used to display the order attribution data metabox on the edit order screen.
 *
 * @see     Automattic\WooCommerce\Internal\Orders\OrderAttributionController
 * @package WooCommerce\Templates
 * @version 8.6.0-dev
 */

declare( strict_types=1 );

defined( 'ABSPATH' ) || exit;

/**
 * Variables used in this file.
 *
 * @var array $meta Array of meta data.
 * @var bool  $has_more_details Whether to show the more details toggle.
 */
?>

<div class="order-attribution-metabox">

	<?php if ( array_key_exists( 'origin', $meta ) ) : ?>
		<h4><?php esc_html_e( 'أصل', 'woocommerce' ); ?></h4>
	<?php endif; ?>

	<div class="woocommerce-order-attribution-origin-container">

		<?php if ( array_key_exists( 'origin', $meta ) ) : ?>
			<span class="order-attribution-origin">
				<?php echo esc_html( $meta['origin'] ); ?>
			</span>
		<?php endif; ?>

		<?php if ( $has_more_details ) : ?>

			<a href="" class="woocommerce-order-attribution-details-toggle" aria-expanded="false">
				<span class="toggle-text show"><?php esc_html_e( 'اظهر التفاصيل', 'woocommerce' ); ?></span>
				<span class="toggle-text hide" aria-hidden="true"><?php esc_html_e( 'أخف التفاصيل', 'woocommerce' ); ?></span>
				<span class="toggle-indicator" aria-hidden="true"></span>
			</a>
		<?php endif; ?>

	</div>

	<div class="woocommerce-order-attribution-details-container closed">
		<?php if ( array_key_exists( 'source_type', $meta ) ) : ?>
			<h4><?php esc_html_e( 'نوع المصدر', 'woocommerce' ); ?></h4>
			<span class="order-attribution-source_type">
				<?php echo esc_html( $meta['source_type'] ); ?>
			</span>
		<?php endif; ?>

		<?php if ( array_key_exists( 'utm_campaign', $meta ) ) : ?>
			<h4>
				<?php esc_html_e( 'حملة', 'woocommerce' ); ?>
			</h4>
			<span class="order-attribution-utm-campaign">
				<?php echo esc_html( $meta['utm_campaign'] ); ?>
			</span>
		<?php endif; ?>

		<?php if ( array_key_exists( 'utm_source', $meta ) ) : ?>
			<h4>
				<?php esc_html_e( 'مصدر', 'woocommerce' ); ?>

			</h4>
			<span class="order-attribution-utm-source">
				<?php echo esc_html( $meta['utm_source'] ); ?>
			</span>
		<?php endif; ?>

		<?php if ( array_key_exists( 'utm_medium', $meta ) ) : ?>
			<h4>
				<?php esc_html_e( 'واسطة', 'woocommerce' ); ?>
			</h4>
			<span class="order-attribution-utm-medium">
				<?php echo esc_html( $meta['utm_medium'] ); ?>
			</span>
		<?php endif; ?>

	</div>

	<?php if ( array_key_exists( 'device_type', $meta ) ) : ?>
		<h4><?php esc_html_e( 'نوع الجهاز', 'woocommerce' ); ?></h4>
		<span class="order-attribution-device_type">
			<?php echo esc_html( $meta['device_type'] ); ?>
		</span>
	<?php endif; ?>

	<?php if ( array_key_exists( 'session_pages', $meta ) ) : ?>
		<h4>
			<?php
			esc_html_e( 'مشاهدات صفحة الجلسة', 'woocommerce' );
			echo wp_kses_post(
				wc_help_tip(
					__(
'عدد الصفحات الفريدة التي شاهدها العميل قبل هذا الطلب.',
						'woocommerce'
					)
				)
			);
			?>
		</h4>
		<span class="order-attribution-utm-session-pages">
			<?php echo esc_html( $meta['session_pages'] ); ?>
		</span>
	<?php endif; ?>
</div>
