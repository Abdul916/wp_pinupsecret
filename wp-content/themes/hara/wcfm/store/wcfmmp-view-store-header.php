<?php
/**
 * The Template for displaying all store header
 *
 * @package WCfM Markeplace Views Store Header
 *
 * For edit coping this to yourtheme/wcfm/store
 *
 */

if (! defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

global $WCFM, $WCFMmp;

$gravatar = $store_user->get_avatar();
$email    = $store_user->get_email();
$phone    = $store_user->get_phone();
$address  = $store_user->get_address_string();

$store_address_info_class = '';

?>

<?php do_action('wcfmmp_store_before_header', $store_user->get_id()); ?>

<div id="wcfm_store_header">
	<div class="header_wrapper">
		<div class="header_area">
			<div class="lft header_left">
			
				<?php do_action('wcfmmp_store_before_avatar', $store_user->get_id()); ?>
				<div class="logo-wrapper">
					<div class="logo_area">
						<a href="#"><img src="<?php echo esc_url($gravatar); ?>" alt="<?php esc_attr_e('Logo', 'hara'); ?>"/></a>
					</div>
					<div class="logo_area_after">
						<?php do_action('wcfmmp_store_after_avatar', $store_user->get_id()); ?>
						
						<?php if (apply_filters('wcfm_is_pref_vendor_reviews', true)) {
    $WCFMmp->wcfmmp_reviews->show_star_rating(0, $store_user->get_id());
} ?>
						
						<?php if (!apply_filters('wcfm_is_allow_badges_with_store_name', false)) { ?>
							<div class="wcfmmp_store_mobile_badges">
								<?php do_action('wcfmmp_store_mobile_badges', $store_user->get_id()); ?>
								<div class="spacer"></div> 
							</div>
						<?php } ?>
						<div class="spacer"></div>  
					</div>
				</div>
				<div class="address rgt">
				  <?php if (($WCFMmp->wcfmmp_vendor->get_vendor_name_position($store_user->get_id()) == 'on_header') || apply_filters('wcfm_is_allow_store_name_on_header', false)) { ?>
				  	<h1 class="wcfm_store_title">
				  	  <?php echo apply_filters('wcfmmp_store_title', $store_info['store_name'], $store_user->get_id()); ?>
				  	  <?php if (apply_filters('wcfm_is_allow_badges_with_store_name', false)) { ?>
								<div class="wcfmmp_store_mobile_badges wcfmmp_store_mobile_badges_with_store_name">
									<?php do_action('wcfmmp_store_mobile_badges', $store_user->get_id()); ?>
									<div class="spacer"></div> 
								</div>
							<?php } ?>
				  	</h1>
				  <?php $store_address_info_class = 'header_store_name'; } ?>
				  
				  <?php do_action('before_wcfmmp_store_header_info', $store_user->get_id()); ?>
					<?php do_action('wcfmmp_store_before_address', $store_user->get_id()); ?>
					
					<?php if ($address && ($store_info['store_hide_address'] == 'no') && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'vendor_address')) { ?>
						<p class="<?php echo esc_attr($store_address_info_class); ?>"><i class="wcfmfa fa-map-marker" aria-hidden="true"></i><span><?php echo trim($address); ?></span></p>
					<?php } ?>
					
					<?php do_action('wcfmmp_store_after_address', $store_user->get_id()); ?>
					<?php do_action('wcfmmp_store_before_phone', $store_user->get_id()); ?>
					
					<div class="<?php echo esc_attr($store_address_info_class); ?>">
						<?php if ($phone && ($store_info['store_hide_phone'] == 'no') && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'vendor_phone')) { ?>
							<div class="store_info_parallal"><i class="wcfmfa fa-phone" aria-hidden="true"></i><span><a href="tel:<?php echo trim($phone); ?>"><?php echo trim($phone); ?></a></span></div>
						<?php } ?>
						
						<?php do_action('wcfmmp_store_after_phone', $store_user->get_id()); ?>
						<?php do_action('wcfmmp_store_before_email', $store_user->get_id()); ?>
						
						<?php if ($email && ($store_info['store_hide_email'] == 'no') && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'vendor_email')) { ?>
							<div class="store_info_parallal"><i class="wcfmfa fa-envelope" aria-hidden="true"></i><span><a href="mailto:<?php echo trim($email); ?>"><?php echo trim($email); ?></a></span></div>
						<?php } ?>
						<div class="spacer"></div>  
					</div>
					
					<?php do_action('wcfmmp_store_after_email', $store_user->get_id()); ?>
					<?php do_action('after_wcfmmp_store_header_info', $store_user->get_id()); ?>
				</div>
			  <div class="spacer"></div>    
			</div>
			<div class="header_right">
				<div class="bd_icon_area lft">
				
				  <?php do_action('before_wcfmmp_store_header_actions', $store_user->get_id()); ?>
				
					<?php do_action('wcfmmp_store_before_enquiry', $store_user->get_id()); ?>
					
					<?php if (apply_filters('wcfm_is_pref_enquiry', true) && apply_filters('wcfmmp_is_allow_store_header_enquiry', true) && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'enquiry')) { ?>
						<?php do_action('wcfmmp_store_enquiry', $store_user->get_id()); ?>
					<?php } ?>
					
					<?php do_action('wcfmmp_store_after_enquiry', $store_user->get_id()); ?>
					<?php do_action('wcfmmp_store_before_follow_me', $store_user->get_id()); ?>
					
					<?php
                    if (apply_filters('wcfm_is_pref_vendor_followers', true) && apply_filters('wcfm_is_allow_store_followers', true) && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'vendor_follower')) {
                        do_action('wcfmmp_store_follow_me', $store_user->get_id());
                    }
                    ?>
					
					<?php do_action('wcfmmp_store_after_follow_me', $store_user->get_id()); ?>
					
					<?php do_action('after_wcfmmp_store_header_actions', $store_user->get_id()); ?>
					
					<div class="spacer"></div>   
				</div>
				<?php if (!empty($store_info['social']) && $store_user->has_social() && $WCFM->wcfm_vendor_support->wcfm_vendor_has_capability($store_user->get_id(), 'vendor_social')) { ?>
					<div class="social_area rgt">
						<?php $WCFMmp->template->get_template('store/wcfmmp-view-store-social.php', array( 'store_user' => $store_user, 'store_info' => $store_info )); ?>
					</div>
					 <div class="spacer"></div>
				<?php } ?>
				<div class="spacer"></div>
			</div>
		  <div class="spacer"></div>    
		</div>
	</div>
</div>

<?php do_action('wcfmmp_store_after_header', $store_user->get_id()); ?>