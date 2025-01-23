<?php
defined('ABSPATH') || exit; // Exit if accessed directly

// Round discount by using php round function and it is round half up (1.5 into 2)
add_filter('advanced_woo_discount_rules_discount_prices_of_product', function ($discount_prices, $product, $quantity, $cart_item) {
    if (function_exists('wc_get_price_decimals')) {
        $precision = wc_get_price_decimals();
        if (isset($discount_prices['discounted_price'])) {
            $discount_prices['discounted_price'] = round($discount_prices['discounted_price'], $precision);
        }
        if (isset($discount_prices['discounted_price_with_tax'])) {
            $discount_prices['discounted_price_with_tax'] = round($discount_prices['discounted_price_with_tax'], $precision);
        }
        if (isset($discount_prices['discount_lines'])) {
            foreach ($discount_prices['discount_lines'] as $key => $value) {
                if ($key !== 'non_applied') {
                    $line_discount = $discount_prices['discount_lines'][$key]['discounted_price'];
                    $discount_prices['discount_lines'][$key]['discounted_price'] = round($line_discount, $precision);
                }
            }
        }
    }
    return $discount_prices;
}, 10, 4);
