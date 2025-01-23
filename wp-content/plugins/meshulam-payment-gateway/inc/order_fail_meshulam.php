<?php
/**
Template Name:Order fail meshulam
*/

get_header();

global $woocommerce;
$cart_url = $woocommerce->cart->get_cart_url();
$lang = get_bloginfo('language');
if ($lang == 'en-US'):
    $title = "Operation failed";
    $short_d = "Please check that the card details are correct";
    $home = "Home";
    $card = "Cart";
else:
    $title = "הפעולה נכשלה";
    $short_d = "נא לבדוק שפרטי הכרטיס נכונים";
    $home = "בית";
    $card = "עגלה";
endif;
?>
<style>
    .woocommerce-breadcrumb{display: none}
</style>
<div class="meshulam_fail_order">
    <div class="meshulam_order_page">
        <div class="popup_content">
            <?php
            $path_url = explode('/', $_SERVER['REQUEST_URI']);
            $path_url = array_filter($path_url);
            $path_url_end = end($path_url);
            ?>
            <h1><?php echo $title; ?></h1>
            <div class="text">
                <!-- <p><?php // echo $short_d; ?></p> -->
                <p><?php echo get_post_meta($path_url_end, 'meshulam_payment_error', true); ?></p>
            </div>
            <a href="<?php echo home_url(); ?>"><?php echo $home; ?></a>
            <a href="<?php echo $cart_url; ?>"><?php echo $card; ?></a>
        </div>
    </div>
</div>

<?php get_footer();