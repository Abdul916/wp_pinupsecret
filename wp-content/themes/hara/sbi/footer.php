<?php
/**
 * Smash Balloon Instagram Feed Footer Template
 * Adds pagination and html for errors and resized images
 *
 * @version 2.2 Instagram Feed by Smash Balloon
 *
 */

// Don't load directly
if (! defined('ABSPATH')) {
    die('-1');
}

$follow_btn_style   = SB_Instagram_Display_Elements::get_follow_styles($settings); // style="background: rgb();color: rgb();"  already escaped
$follow_btn_classes = strpos($follow_btn_style, 'background') !== false ? ' sbi_custom' : '';
$show_follow_button = ($settings['showfollow'] == 'on' || $settings['showfollow'] == 'true' || $settings['showfollow'] == true) && $settings['showfollow'] !== 'false';
$follow_button_text =  $settings['followtext'];

$load_btn_style   = SB_Instagram_Display_Elements::get_load_button_styles($settings); // style="background: rgb();color: rgb();" already escaped
$load_btn_classes = strpos($load_btn_style, 'background') !== false ? ' sbi_custom' : '';
$load_button_text =  $settings['buttontext'];

$hara_atts = json_decode($shortcode_atts, true);

if (!empty($hara_atts['tb-atts'])) {
    $use_pagination = ($hara_atts['data-layout'] === 'carousel') ? false : $use_pagination;
}
?>
<div id="sbi_load">

	<?php if ($use_pagination) : ?>
        <a class="sbi_load_btn" href="javascript:void(0);" <?php echo trim($load_btn_style); ?>>
            <span class="sbi_btn_text"><?php echo esc_html($load_button_text); ?></span>
            <span class="sbi_loader sbi_hidden"></span>
        </a>
	<?php endif; ?>

	<?php if ($first_username && $show_follow_button) : ?>
    <span class="sbi_follow_btn<?php echo esc_attr($follow_btn_classes); ?>">
        <a href="<?php echo esc_url( 'https://www.instagram.com/' . $first_username . '/' ); ?>"<?php echo trim( $follow_btn_style ); ?> target="_blank" rel="noopener nofollow"><?php echo SB_Instagram_Display_Elements::get_icon( 'instagram', 'svg' ); ?><?php echo esc_html( $follow_button_text ); ?></a>
    </span>
	<?php endif; ?>

</div>