<?php
if (! defined('ABSPATH') || function_exists('Hara_Elementor_Template')) {
    exit; // Exit if accessed directly.
}

use Elementor\Controls_Manager;

/**
 * Elementor Hara Elementor Template
 *
 * Elementor widget that displays vertical or horizontal tabs with different
 * pieces of content.
 *
 * @since 1.0.0
 */
class Hara_Elementor_Template extends Elementor\Widget_Base
{
    public function get_name()
    {
        return 'tbay-template';
    }

    public function get_title()
    {
        return esc_html__('Hara Template', 'hara');
    }

    public function get_icon()
    {
        return 'eicon-document-file';
    }

    public function get_categories()
    {
        return [ 'hara-elements' ];
    }

    protected function register_controls()
    {
        $this->start_controls_section(
            'section_template',
            [
                'label' => esc_html__('Hara Template', 'hara'),
            ]
        );

        $templates = Elementor\Plugin::instance()->templates_manager->get_source('local')->get_items();

        if (empty($templates)) {
            $this->add_control(
                'no_templates',
                [
                    'label' => false,
                    'type' => Controls_Manager::RAW_HTML,
                    'raw' => '<div id="elementor-widget-template-empty-templates">
				<div class="elementor-widget-template-empty-templates-icon"><i class="eicon-nerd"></i></div>
				<div class="elementor-widget-template-empty-templates-title">' . esc_html__('You Haven’t Saved Templates Yet.', 'hara') . '</div>
				<div class="elementor-widget-template-empty-templates-footer">' . esc_html__('Want to learn more about Elementor library?', 'hara') . ' <a class="elementor-widget-template-empty-templates-footer-url" href="//go.elementor.com/docs-library/" target="_blank">' . esc_html__('Click Here', 'hara') . '</a>
				</div>
				</div>',
                ]
            );

            return;
        }

        $options = [
            '0' => '— ' . esc_html__('Select', 'hara') . ' —',
        ];

        $types = [];

        foreach ($templates as $template) {
            $options[ $template['template_id'] ] = $template['title'] . ' (' . $template['type'] . ')';
            $types[ $template['template_id'] ] = $template['type'];
        }

        $this->add_control(
            'template_id',
            [
                'label' => esc_html__('Choose Template', 'hara'),
                'type' => Controls_Manager::SELECT,
                'default' => '0',
                'options' => $options,
                'types' => $types,
                'label_block'  => 'true',
            ]
        );

        $this->end_controls_section();
    }

    protected function render()
    {
        $template_id = $this->get_settings('template_id'); ?>
        <div class="elementor-template">
            <?php
            echo \Elementor\Plugin::instance()->frontend->get_builder_content_for_display($template_id, hara_get_elementor_css_print_method()); ?>
        </div>
        <?php
    }
}
$widgets_manager->register(new Hara_Elementor_Template());
