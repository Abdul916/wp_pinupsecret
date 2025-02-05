<?php
/**
 * @version    1.0
 * @package    hara
 * @author     Thembay Team <support@thembay.com>
 * @copyright  Copyright (C) 2023 Thembay.com. All Rights Reserved.
 * @license    GNU/GPL v2 or later http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Websites: https://thembay.com
 */

add_action('wp_enqueue_scripts', 'hara_child_enqueue_styles', 10000);
function hara_child_enqueue_styles() {
    $parent_style = 'hara-style';
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'hara-child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array( $parent_style ),
        wp_get_theme()->get('Version')
    );
}

function override_plugin_js() {
    wp_enqueue_script('new_js_file_1', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/cart-blocks/cart-line-items-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_2', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/cart-blocks/cart-order-summary-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_3', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/cart-blocks/proceed-to-checkout-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_4', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/order-summary-cart-items-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_5', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/order-summary-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_6', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/contact-information-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_7', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/billing-address-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_8', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/order-note-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_9', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/terms-frontend.js', array(), null, true );
    wp_enqueue_script('new_js_file_10', get_stylesheet_directory_uri() . '/woocommerce/assets/client/blocks/checkout-blocks/actions-frontend.js', array(), null, true );
    // wp_enqueue_script('new_js_file_12', get_stylesheet_directory_uri() . '/woocommerce/custom-checkout-blocks.js', array(), null, true );
    wp_enqueue_script('new_js_file_11', get_stylesheet_directory_uri() . '/woocommerce/cart_checkout_change_label.js', array(), time(), true );
}

add_action('wp_enqueue_scripts', 'override_plugin_js', 20);
function custom_rename_my_account_menu_items( $items ) {
    if ( isset( $items['dashboard'] ) ) {
        $items['dashboard'] = __( ' لوحة القيادة  ', 'woocommerce' );
    }
    if ( isset( $items['orders'] ) ) {
        $items['orders'] = __( 'طلبات  ', 'woocommerce' );
    }
    if ( isset( $items['downloads'] ) ) {
        $items['downloads'] = __( ' التحميلات  ', 'woocommerce' );
    }
    // if ( isset( $items['edit-address'] ) ) {
    //     $items['edit-address'] = __( 'عناوين', 'woocommerce' );
    // }
    // if ( isset( $items['payment-methods'] ) ) {
    //     $items['payment-methods'] = __( 'Payment Methods', 'woocommerce' );
    // }
    // if ( isset( $items['edit-account'] ) ) {
    //     $items['edit-account'] = __( 'تفاصيل الحساب', 'woocommerce' );
    // }
    // if ( isset( $items['customer-logout'] ) ) {
    //     $items['customer-logout'] = __( 'خروج', 'woocommerce' );
    // }
    return $items;
}
add_filter( 'woocommerce_account_menu_items', 'custom_rename_my_account_menu_items' );

add_filter( 'woocommerce_account_orders_columns', 'custom_wc_account_orders_columns' );
function custom_wc_account_orders_columns( $columns ) {
    $columns['order-number']  = __( ' طلب  ', 'woocommerce' );
    $columns['order-date']    = __( ' تاريخ  ', 'woocommerce' );
    $columns['order-status']  = __( ' حالة  ', 'woocommerce' );
    $columns['order-total']   = __( ' المجموع  ', 'woocommerce' );
    $columns['order-actions'] = __( ' أجراءات  ', 'woocommerce' );
    return $columns;
}

add_filter('hara_localize_translate', 'my_custom_localize_translate');
function my_custom_localize_translate($config) {
    $config['cancel'] = esc_html__('إلغاء', 'hara');
    $config['show_all_text'] = esc_html__('عرض الكل', 'hara');
    $config['search'] = esc_html__('بحث', 'hara');
    $config['popup_cart_noti'] = esc_html__('تمت الإضافة إلى سلة التسوق.', 'hara');
    $config['i18n_checkout'] = esc_html__('الدفع', 'hara');
    return $config;
}

add_action('after_setup_theme', 'my_custom_override_wc_functions');
function my_custom_override_wc_functions() {
    remove_filter('woocommerce_account_menu_items', array('Hara_WC_Class', 'yith_add_wcwl_link_my_account'), 10);
    add_filter('woocommerce_account_menu_items', 'my_custom_yith_add_wcwl_link_my_account', 10, 1);
}
function my_custom_yith_add_wcwl_link_my_account($items) {
    if (!class_exists('YITH_WCWL')) {
        return $items;
    }
    $wishlist_page_id = yith_wcwl_object_id(get_option('yith_wcwl_wishlist_page_id'));
    $slug = get_post_field('post_name', $wishlist_page_id);
    unset($items['edit-address']);
    unset($items['customer-logout']);
    unset($items['payment-methods']);
    unset($items['edit-account']);
    $items[$slug]                       =   esc_html__(' قائمة امنياتي  ', 'hara');
    $items['edit-address']              =   esc_html__('عناوين  ', 'hara');
    $items['payment-methods']           =   esc_html__(' طرق الدفع ', 'hara');
    $items['edit-account']              =   esc_html__(' تفاصيل الحساب ', 'hara');
    $items['customer-logout']           =   esc_html__('تسجيل خروج  ', 'hara');
    return $items;
}


if ( ! function_exists( 'woocommerce_widget_shopping_cart_subtotal' ) ) {
    function woocommerce_widget_shopping_cart_subtotal() {
        echo '<strong>' . esc_html__( 'المجموع الفرعي:   ', 'woocommerce' ) . '</strong> ' . WC()->cart->get_cart_subtotal();
    }
}
function my_custom_woocommerce_get_country_locale($locales) {
    foreach ($locales as $country_code => $locale_fields) {
        $locales[$country_code]['email']['label'] = __( ' عنوان البريد الإلكتروني  ', 'woocommerce' );
        $locales[$country_code]['first_name']['label'] = __( 'الاسم الأول  ', 'woocommerce' );
        $locales[$country_code]['last_name']['label'] = __( 'اسم العائلة  ', 'woocommerce' );
        $locales[$country_code]['company']['label'] = __( 'شركة  ' ,  'woocommerce' );
        $locales[$country_code]['address_1']['label'] = __( 'عنوان  ', 'woocommerce' );
        $locales[$country_code]['address_1']['placeholder'] = __( 'رقم المنزل واسم الشارع ', 'woocommerce' );
        $locales[$country_code]['address_2']['placeholder'] = __( 'شقة، جناح، وحدة، الخ (اختياري )', 'woocommerce' );
        $locales[$country_code]['postcode']['label'] = __( ' الرمز البريدي  ', 'woocommerce' );
        $locales[$country_code]['state']['label'] = __( 'ولاية  ', 'woocommerce' );
        $locales[$country_code]['city']['label'] = __( 'مدينة   ', 'woocommerce' );
        $locales[$country_code]['country']['label'] = __( ' الدولة  ', 'woocommerce' );
    }
    return $locales;
}
add_filter('woocommerce_get_country_locale', 'my_custom_woocommerce_get_country_locale');

function my_custom_order_statuses( $order_statuses ) {
    $order_statuses['wc-pending'] = _x( ' في انتظار الدفع  ', 'Order status', 'your-theme' );
    $order_statuses['wc-processing'] = _x( ' يعالج  ', 'Order status', 'your-theme' );
    $order_statuses['wc-on-hold'] = _x( ' في الانتظار  ', 'Order status', 'your-theme' );
    $order_statuses['wc-completed'] = _x( ' مكتمل  ', 'Order status', 'your-theme' );
    $order_statuses['wc-cancelled'] = _x( ' ألغيت  ', 'Order status', 'your-theme' );
    $order_statuses['wc-refunded'] = _x( ' ردها  ', 'Order status', 'your-theme' );
    $order_statuses['wc-failed'] = _x( ' فشل  ', 'Order status', 'your-theme' );
    return $order_statuses;
}
add_filter( 'wc_order_statuses', 'my_custom_order_statuses' );

add_filter( 'woocommerce_my_account_my_orders_actions', 'my_custom_order_actions', 10, 2 );
function my_custom_order_actions( $actions, $order ) {
    if ( ! is_object( $order ) ) {
        $order_id = absint( $order );
        $order    = wc_get_order( $order_id );
    }
    $actions['pay']['name'] = __( 'يدفع  ', 'your-theme' );
    $actions['view']['name'] = __( 'منظر  ', 'your-theme' );
    $actions['cancel']['name'] = __( 'يلغي  ', 'your-theme' );
    if ( ! $order->needs_payment() ) {
        unset( $actions['pay'] );
    }
    if ( ! in_array( $order->get_status(), apply_filters( 'woocommerce_valid_order_statuses_for_cancel', array( 'pending', 'failed' ), $order ), true ) ) {
        unset( $actions['cancel'] );
    }
    return $actions;
}

add_filter( 'woocommerce_get_order_item_totals', 'my_custom_payment_method_text_payment_method', 10, 2 );
function my_custom_payment_method_text_payment_method( $total_rows, $order ) {
    if ( isset( $total_rows['payment_method'] ) ) {
        $total_rows['payment_method']['label'] = __( 'طريقة الدفع :', 'your-theme' );
    }
    return $total_rows;
}

add_filter( 'woocommerce_product_additional_information_heading', 'my_custom_additional_info_heading' );
function my_custom_additional_info_heading( $default_heading ) {
  return __( 'معلومات إضافية  ', 'your-theme' );
}


if ( ! function_exists( 'custom_woocommerce_catalog_orderby' ) ) {
    function custom_woocommerce_catalog_orderby( $orderby ) {
        $orderby['menu_order'] = __( ' الفرز الافتراضى  ', 'woocommerce' );
        $orderby['popularity'] = __( ' الترتيب حسب الشعبية  ', 'woocommerce' );
        $orderby['rating']     = __( ' الترتيب حسب متوسط التقييم  ', 'woocommerce' );
        $orderby['date']       = __( ' الترتيب حسب الأحدث  ', 'woocommerce' );
        $orderby['price']      = __( ' الترتيب حسب السعر: من الأقل إلى الأعلى  ', 'woocommerce' );
        $orderby['price-desc'] = __( ' الترتيب حسب السعر: من الأعلى إلى الأقل  ', 'woocommerce' );

        return $orderby;
    }
    add_filter( 'woocommerce_catalog_orderby', 'custom_woocommerce_catalog_orderby' );
}


function custom_woocommerce_products_filter_text( $translated_text, $text, $domain ) {
    if ( $domain === 'woocommerce-products-filter' ) {
        switch ( $text ) {
            case 'orderby':
            $translated_text = ' ترتيب حسب  ';
            break;
            case 'date':
            $translated_text = ' تاريخ  ';
            break;
            // case 'per page':
            //     $translated_text = 'Per Page';
            //     break;
            // case 'price range':
            //     $translated_text = 'Price Range';
            //     break;
            // case 'menu order':
            //     $translated_text = 'Menu Order';
            //     break;
            case 'popularity':
            $translated_text = ' شعبية  ';
            break;
            case 'rating':
            $translated_text = ' تقييم  ';
            break;
            case 'price low to high':
            $translated_text = ' السعر من الارخص للاعلى  ';
            break;
            case 'price high to low':
            $translated_text = ' السعر الاعلى الى الادنى  ';
            break;
            case 'Loading ...':
            $translated_text = ' تحميل ...  ';
            break;
            case 'Clear All':
            $translated_text = ' امسح الكل  ';
            break;
        }
    }
    return $translated_text;
}
add_filter( 'gettext', 'custom_woocommerce_products_filter_text', 20, 3 );


function hara_child_change_sort_by_text( $translated_text, $text, $domain ) {
    if ( 'hara' === $domain && 'Sort by:' === $text ) {
        $translated_text = 'ترتيب حسب  :';
    }elseif ( 'hara' === $domain && 'View:' === $text ) {
        $translated_text = 'منظر :';
    }elseif ( 'hara' === $domain && 'Top' === $text ) {
        $translated_text = '↑';
    }elseif ( 'hara' === $domain && 'Login/Register' === $text ) {
        $translated_text = ' تسجيل الدخول  /يسجل  ';
    }elseif ( 'hara' === $domain && 'View details' === $text ) {
        $translated_text = 'عرض التفاصيل  ';
    }elseif ( 'hara' === $domain && 'Choose an option ' === $text ) {
        $translated_text = ' إختر خيار ';
    }elseif ( 'hara' === $domain && 'Username or email address' === $text ) {
        $translated_text = ' اسم المستخدم أو البريد الالكتروني  ';
    }elseif ( 'hara' === $domain && 'Password' === $text ) {
        $translated_text = ' كلمة المرور  ';
    }elseif ( 'hara' === $domain && 'Remember me' === $text ) {
        $translated_text = ' تذكرنى  ';
    }elseif ( 'hara' === $domain && 'Lost password?' === $text ) {
        $translated_text = ' كلمة مرور مفقودة؟  ';
    }elseif ( 'hara' === $domain && 'Log in' === $text ) {
        $translated_text = ' تسجيل الدخول  ';
    }elseif ( 'hara' === $domain && 'Sign in' === $text ) {
        $translated_text = ' تسجيل الدخول  ';
    }elseif ( 'hara' === $domain && 'Create an account' === $text ) {
        $translated_text = ' إنشاء حساب  ';
    }elseif ( 'hara' === $domain && 'Shopping cart' === $text ) {
        $translated_text = ' عربة التسوق  ';
    }elseif ( 'woocommerce' === $domain && 'Name' === $text ) {
        $translated_text = ' اسم ';
    }elseif ( 'woocommerce' === $domain && 'Email' === $text ) {
        $translated_text = ' بريد إلكتروني  ';
    }elseif ( 'woocommerce' === $domain && 'Your review is awaiting approval' === $text ) {
        $translated_text = ' مراجعتك في انتظار الموافقة  ';
    }elseif ( 'woocommerce' === $domain && 'Please select a rating' === $text ) {
        $translated_text = ' الرجاء تحديد التقييم   ';
    }elseif ( 'woocommerce' === $domain && 'Total:' === $text ) {
        $translated_text = ' المجموع:  ';
    }elseif ( 'woocommerce' === $domain && 'Subtotal:' === $text ) {
        $translated_text = ' المجموع الفرعي: ';
    }elseif ( 'hara' === $domain && 'Out of stock' === $text ) {
        $translated_text = 'غير متوفر حالي  ';
    }
    return $translated_text;
}
add_filter( 'gettext', 'hara_child_change_sort_by_text', 20, 3 );


function modify_comment_form_defaults($defaults) {
    $defaults['comment_notes_before'] = '<p class="comment-notes"><span id="email-notes">  لن يتم نشر عنوان بريدك الإلكتروني.   </span></p>';
    return $defaults;
}
add_filter('comment_form_defaults', 'modify_comment_form_defaults');

function custom_comment_form_text($translated_text, $text, $domain) {
    if ($translated_text === 'Save my name, email, and website in this browser for the next time I comment.') {
        $translated_text = '   احفظ اسمي، بريدي الإلكتروني، والموقع الإلكتروني في هذا المتصفح لاستخدامها في المرة القادمة التي أقوم فيها بالتعليق.      ';
    }elseif( $text == '<strong>Error:</strong> Please enter a valid email address.' ) {
        $translated_text = ' خطأ: من فضلك أدخل عنوان إلكتروني صحيح.   ';
    }elseif($translated_text === '« Back') {
        $translated_text = ' خلف  ';
    }elseif( $text == '<strong>Error:</strong> Please fill the required fields.' ) {
        $translated_text = ' خطأ: يرجى ملء الحقول المطلوبة.   ';
    }elseif( $text == '<strong>Error:</strong> Please type your comment text.' ) {
        $translated_text = ' خطأ: الرجاء كتابة نص التعليق الخاص بك ';
    }elseif ( $text == '&laquo; Back' ) {
        $translated_text = ' &laquo; خلف  ';
    }elseif ( $domain == 'yith-woocommerce-wishlist' && $text == 'Product successfully removed.' ) {
        $translated_text = ' تمت إزالة المنتج بنجاح    ';
    }elseif ( $text == 'Cash On Delivery' ) {
        $translated_text = ' الدفع عند الاستلام ';
    }elseif ($domain == 'woocommerce' && $text == 'Invalid username or email.') {
        $translated_text = ' اسم مستخدم أو بريد إلكتروني غير صالح.  ';
    }elseif ($domain == 'woocommerce' && $text == 'Enter a username or email address.') {
        $translated_text = '  أدخل اسم المستخدم أو عنوان البريد الإلكتروني.  ';
    }elseif ($domain == 'woocommerce' && $text == 'Please enter your password.') {
        $translated_text = '  من فضلك أدخل رقمك السري. ';
    }elseif ($text == 'Please enter a stronger password.') {
        $translated_text = ' الرجاء إدخال كلمة سر أقوى.  ';
    }elseif ($domain == 'woocommerce' && $text == 'Passwords do not match.') {
        $translated_text = ' كلمة المرور غير مطابقة.  ';
    }elseif ($domain == 'woocommerce' && $text == 'Your password has been reset successfully.') {
        $translated_text = '  تم إعادة تعيين كلمة المرور الخاصة بك بنجاح.  ';
    }elseif ($domain == 'woocommerce' && $text == 'This key is invalid or has already been used. Please reset your password again if needed.') {
        $translated_text = ' هذا المفتاح غير صالح أو تم استخدامه بالفعل. يرجى إعادة تعيين كلمة المرور الخاصة بك مرة أخرى إذا لزم الأمر.  ';
    }elseif ($domain == 'woocommerce' && $text == 'Error:') {
        $translated_text = 'طأ: ';
    }elseif ($domain == 'woocommerce' && $text == 'Username is required.') {
        $translated_text = 'اسم المستخدم مطلوب.';
    }
    return $translated_text;
}
add_filter('gettext', 'custom_comment_form_text', 20, 3);



function translate_authentication_errors( $translated_text, $text, $domain ) {
    if ( $domain === 'default' ) {
        switch ( $text ) {
            case '<strong>Error:</strong> The username field is empty.':
            $translated_text = '<strong>خطأ:</strong> حقل اسم المستخدم فارغ.';
            break;
            case '<strong>Error:</strong> The password field is empty.':
            $translated_text = '<strong>خطأ:</strong> حقل كلمة المرور فارغ.';
            break;
            case '<strong>Error:</strong> The username <strong>%s</strong> is not registered on this site. If you are unsure of your username, try your email address instead.':
            $translated_text = '<strong>خطأ:</strong> اسم المستخدم <strong>%s</strong> غير مسجل في هذا الموقع. إذا كنت غير متأكد من اسم المستخدم الخاص بك، جرب عنوان بريدك الإلكتروني بدلاً من ذلك.';
            break;
            case '<strong>Error:</strong> The password you entered for the username %s is incorrect.':
            $translated_text = '<strong>خطأ:</strong> كلمة المرور التي أدخلتها لاسم المستخدم %s غير صحيحة.';
            break;
            case 'Lost your password?':
            $translated_text = 'هل نسيت كلمة المرور؟';
            break;
            case '<strong>Error:</strong> The email field is empty.':
            $translated_text = '<strong>خطأ:</strong> حقل البريد الإلكتروني فارغ.';
            break;
            case '<strong>Error:</strong> Username is required.':
            $translated_text = '<strong>خطأ:</strong> اسم المستخدم مطلوب.';
            break;
            case 'Unknown email address. Check again or try your username.':
            $translated_text = 'عنوان البريد الإلكتروني غير معروف. تحقق مرة أخرى أو جرب اسم المستخدم الخاص بك.';
            break;
            case '<strong>Error:</strong> The password you entered for the email address %s is incorrect.':
            $translated_text = '<strong>خطأ:</strong> كلمة المرور التي أدخلتها لعنوان البريد الإلكتروني %s غير صحيحة.';
            break;
        }
    }
    return $translated_text;
}
add_filter( 'gettext', 'translate_authentication_errors', 20, 3 );


add_action( 'wp_enqueue_scripts', 'custom_password_strength_meter_texts' );

function custom_password_strength_meter_texts() {
    wp_enqueue_script( 'password-strength-meter' );
    wp_localize_script(
        'password-strength-meter', 'pwsL10n',
        array(
            'unknown'  => __( '  قوة كلمة المرور غير معروفة  ', 'textdomain' ),
            'short'    => __( '  ضعيف جدا  ', 'textdomain' ),
            'bad'      => __( '  ضعيف  ', 'textdomain' ),
            'good'     => __( '  واسطة  ', 'textdomain' ),
            'strong'   => __( '  قوي  ', 'textdomain' ),
            'mismatch' => __( '  عدم تطابق  ', 'textdomain' ),
        )
    );
}

add_filter( 'password_hint', 'custom_password_hint' );

function custom_password_hint( $hint ) {
    $hint = __( 'تلميح: يجب أن تكون كلمة المرور على الأقل اثني عشر حرفًا. لجعلها أقوى، استخدم الأحرف الكبيرة والصغيرة، والأرقام، والرموز مثل ! " ? $ % ^ & ).', 'textdomain' );

    return $hint;
}



// New Working 23-01-2025
add_filter('woocommerce_form_field', 'replace_optional_text_with_arabic', 10, 4);
function replace_optional_text_with_arabic($field, $key, $args, $value) {
    if (isset($args['required']) && !$args['required']) {
        $field = str_replace('(optional)', '(اختياري )', $field);
    }
    return $field;
}
add_filter('woocommerce_checkout_fields', 'custom_override_checkout_fields');
function custom_override_checkout_fields($fields) {
    if (isset($fields['billing']['billing_phone'])) {
         $fields['billing']['billing_phone']['label'] = ' رقم الهاتف  ';
    }
    if (isset($fields['billing']['billing_email'])) {
        $fields['billing']['billing_email']['label'] = ' عنوان البريد الإلكتروني  ';
    }
    if (isset($fields['order']['order_comments'])) {
        $fields['order']['order_comments']['label'] = 'معلومات إضافية ';
        $fields['order']['order_comments']['placeholder'] = 'ملاحظات حول طلبك، مثل تعليمات خاصة للتوصيل.';
    }
    return $fields;
}
add_filter( 'gettext', 'change_additional_information_text', 20, 3 );
function change_additional_information_text( $translated_text, $text, $domain ) {
    if ( 'Additional information' === $text && 'woocommerce' === $domain ) {
        $translated_text = 'معلومات إضافية ';
    }
    if ( 'Invalid billing email address' === $text && 'woocommerce' === $domain ) {
        $translated_text = __( 'عنوان بريد إلكتروني غير صالح للفواتير ');
    }
    // if ( 'Coupon "%s" does not exist!' === $text && 'woocommerce' === $domain ) {
    //     $translated_text = __( 'الكوبون  "%s" غير موجود!');
    // }
    return $translated_text;
}
add_filter('woocommerce_gateway_title', 'change_cod_gateway_title', 10, 2);
function change_cod_gateway_title($title, $gateway_id) {
    if ($gateway_id === 'cod') {
        $title = 'الدفع عند الاستلام';
    }
    return $title;
}
add_filter('woocommerce_gateway_description', 'change_cod_description', 10, 2);
function change_cod_description($description, $gateway_id) {
    if ($gateway_id === 'cod') {
        $description = 'الدفع نقدًا عند الاستلام';
    }
    return $description;
}
add_filter('woocommerce_order_button_text', 'change_place_order_button_text');
function change_place_order_button_text($button_text) {
     return 'اشتري الان  ';
}

// add_filter('woocommerce_get_privacy_policy_text', 'custom_wc_privacy_policy_text_with_link', 10, 2);
// function custom_wc_privacy_policy_text_with_link($text, $type) {
//     $privacy_policy_page_id = wc_privacy_policy_page_id();
//     $privacy_policy_url = get_permalink($privacy_policy_page_id);
//     if (!empty($privacy_policy_url)) {
//         if ($type === 'checkout') {
//             $text = 'سيتم استخدام بياناتك الشخصية لمعالجة طلبك ودعم تجربتك عبر هذا الموقع ولأغراض أخرى موصوفة في  <a href="' . esc_url($privacy_policy_url) . '" target="_blank">سياسة الخصوصية  </a>.';
//         } elseif ($type === 'registration') {
//             $text = 'سيتم استخدام بياناتك الشخصية لدعم تجربتك عبر هذا الموقع، وإدارة الوصول إلى حسابك، ولأغراض أخرى موصوفة في  <a href="' . esc_url($privacy_policy_url) . '" target="_blank">سياسة الخصوصية  </a>.';
//         }
//     }
//     return $text;
// }


function custom_checkout_required_field_error_notice( $notice, $field_label, $field_key ) {
    $custom_messages = array(
        'billing_first_name' => __( 'الاسم الأول للفواتير هو حقل مطلوب. ', 'hara' ),
        'billing_last_name'  => __( 'الاسم الأخير للفواتير هو حقل مطلوب. ', 'hara' ),
        'billing_address_1'  => __( 'عنوان الفاتورة هو حقل مطلوب. ', 'hara' ),
        'billing_postcode'   => __( 'إرسال الفواتير الرمز البريدي هو حقل مطلوب. ', 'hara' ),
        'billing_city'       => __( 'حقل مدينة الفواتير مطلوب. ', 'hara' ),
        'billing_phone'      => __( 'رقم الهاتف للفواتير هو حقل مطلوب. ', 'hara' ),
        'billing_email'      => __( 'عنوان البريد الإلكتروني الخاص بالفوترة هو حقل مطلوب. ', 'hara' ),
    );
    if ( isset( $custom_messages[ $field_key ] ) ) {
        return $custom_messages[ $field_key ];
    }
    return $notice;
}
add_filter( 'woocommerce_checkout_required_field_notice', 'custom_checkout_required_field_error_notice', 10, 3 );
function get_arabic_order_date( $order_date ) {
    if ( $order_date ) {
        $date_object = new DateTime( $order_date->date( 'Y-m-d H:i:s' ) );
        $locale = 'ar_EG';
        $formatter = new IntlDateFormatter(
            $locale,
            IntlDateFormatter::LONG,
            IntlDateFormatter::NONE
        );
        return $formatter->format( $date_object );
    }
    return '';
}



add_filter('woocommerce_get_privacy_policy_text', 'custom_wc_privacy_policy_text_with_checkbox', 10, 2);
function custom_wc_privacy_policy_text_with_checkbox($text, $type) {
    $privacy_policy_page_id = wc_privacy_policy_page_id();
    $privacy_policy_url = get_permalink($privacy_policy_page_id);
    if (!empty($privacy_policy_url)) {
        if ($type === 'checkout') {
            $text = '';
        } elseif ($type === 'registration') {
            $text = '';
        }
    }
    return $text;
}


add_action('woocommerce_checkout_before_terms_and_conditions', 'add_custom_checkbox_to_checkout');
function add_custom_checkbox_to_checkout() {
    echo '
    <div class="woocommerce-terms-and-conditions-wrapper">
    <div class="woocommerce-privacy-policy-text">
    <p>
    <input type="checkbox" id="terms_conditions_checkbox" required checked style="display: inline; margin-right: 5px;">
    من خلال الاستمرار في عملية الشراء فإنك توافق على لدينا  <a href="https://pinup-secret.pro/الأحكام-والشروط/" target="_blank">الأحكام والشروط</a>و ياسة الخصوصية .
    </p>
    </div>
    </div>
    ';
}
