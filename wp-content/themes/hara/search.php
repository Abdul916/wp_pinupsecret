<?php
/**
 * The template for displaying search results pages.
 *
 * @package WordPress
 * @subpackage Hara
 * @since Hara 1.0
 */

get_header();


if ( !hara_redux_framework_activated() ) {
    $colContent = (is_active_sidebar('sidebar-default')) ? 9 : 12; ?>
	<div id="primary" class="content-area content-index search-content">
		<div id="main" class="site-main">
			<div class="container">
			<div class="container-inner main-content">
				<div class="row tb-custom-size"> 
	                <!-- MAIN CONTENT -->
	                <div class="col-xl-<?php echo esc_attr($colContent); ?> ">
	                	    <header class="page-header">
						        <h1 class="page-title"><?php printf(esc_html__('Search Results for:', 'hara') . ' %s', '<span>' . get_search_query() . '</span>'); ?></h1>
						    </header><!-- .page-header -->
	                        <?php  if (have_posts()) :
                                while (have_posts()) : the_post(); ?>
										<div class="layout-blog">
											<?php get_template_part('post-formats/content', get_post_format()); ?>
										</div>
									<?php
                                // End the loop.
                                endwhile;
    hara_tbay_paging_nav(); ?>
	                        <?php else : ?>
	                            <?php get_template_part('post-formats/content', 'none'); ?>
	                        <?php endif; ?>
	                </div>
					<?php if (is_active_sidebar('sidebar-default')) : ?>
						<div class="col-xl-3 col-12 sidebar">
						   <?php dynamic_sidebar('sidebar-default'); ?>
						</div>
					<?php endif; ?>
	            </div>
	        </div>
	        </div>
		</div><!-- .site-main -->
	</div><!-- .content-area -->

	<?php
} else {
        $sidebar_configs = hara_tbay_get_blog_layout_configs();
        $blog_archive_layout =  (isset($_GET['blog_archive_layout']))  ? $_GET['blog_archive_layout'] : hara_tbay_get_config('blog_archive_layout', 'main-right');

        $class_row = ($blog_archive_layout === 'main-right') ? 'tb-column-reverse tb-custom-blog' : 'tb-custom-blog';

        $class_main = apply_filters('hara_tbay_post_content_class', 'container');

        hara_tbay_render_breadcrumbs(); ?>
	<header class="page-header">
		<div class="content <?php echo esc_attr($class_main); ?>">
		<?php
        the_archive_description('<div class="taxonomy-description">', '</div>'); ?>
		</div>
	</header><!-- .page-header -->
	<section id="main-container" class="main-content <?php echo esc_attr($class_main); ?>">
		<div class="row <?php echo esc_attr($class_row); ?>">
			<?php if (($blog_archive_layout !== 'main') && is_active_sidebar($sidebar_configs['sidebar']['id'])) : ?>
				<div class="<?php echo esc_attr($sidebar_configs['sidebar']['class']) ; ?>">
				  	<aside class="sidebar" itemscope="itemscope" itemtype="http://schema.org/WPSideBar">
				   		<?php dynamic_sidebar($sidebar_configs['sidebar']['id']); ?>
				  	</aside>
				</div>
			<?php endif; ?>

			<div id="main-content" class="col-12 <?php echo esc_attr($sidebar_configs['main']['class']); ?>">
				<div id="main" class="site-main layout-blog">

				<?php if (have_posts()) : ?>

					<?php
                        the_archive_description('<header class="page-header hidden"><div class="taxonomy-description">', '</div></header>'); ?>

					<?php
                    // Start the Loop.
                    while (have_posts()) : the_post();

        /*
         * Include the Post-Format-specific template for the content.
         * If you want to override this in a child theme, then include a file
         * called content-___.php (where ___ is the Post Format name) and that will be used instead.
         */ ?>
								<?php get_template_part('post-formats/content', get_post_format()); ?>
						<?php
                    // End the loop.
                    endwhile;

        // Previous/next page navigation.
        hara_tbay_paging_nav();

        // If no content, include the "No posts found" template.
        else :
                    get_template_part('post-formats/content', 'none');

        endif; ?>

				</div><!-- .site-main -->
			</div><!-- .content-area -->
			
		</div>
	</section>
<?php
    }
get_footer(); ?>
