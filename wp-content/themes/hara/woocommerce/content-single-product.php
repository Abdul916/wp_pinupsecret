<?php
/**
 * The template for displaying product content in the single-product.php template
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/content-single-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.6.0
 */

defined('ABSPATH') || exit;

global $product;

$styles   				= 	apply_filters('hara_woo_class_single_product', 10, 2);

$sidebar_configs  		= hara_tbay_get_woocommerce_layout_configs();

$product_single_layout  =   (isset($_GET['product_single_layout']))   ?   $_GET['product_single_layout'] :  hara_get_single_select_layout();
?>

<?php
    /**
     * woocommerce_before_single_product hook
     *
     * @hooked wc_print_notices - 10
     */
     do_action('woocommerce_before_single_product');

     if (post_password_required()) {
         echo get_the_password_form();
         return;
     }
?>

<div id="product-<?php the_ID(); ?>" <?php wc_product_class($styles, $product); ?>>
	
	<?php
        
        switch ($product_single_layout) {
            case 'horizontal':
                wc_get_template('single-product/contents/'.$product_single_layout.'.php');
                break;
            
            default:
                wc_get_template('single-product/contents/normal.php', array('sidebar_configs' => $sidebar_configs ));
                break;
        }
        
    ?>

</div><!-- #product-<?php the_ID(); ?> -->

<?php do_action('woocommerce_after_single_product'); ?>
