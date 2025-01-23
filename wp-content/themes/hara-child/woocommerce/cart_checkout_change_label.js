// window.onload = function() {
//     const cashOnDeliveryLabel = document.querySelector('.wc-block-components-payment-method-label');
//     const cashOnDeliveryDescription = document.querySelector('.wc-block-components-radio-control-accordion-content div');

//     cashOnDeliveryLabel.textContent = ' الدفع عند الاستلام  ';
//     cashOnDeliveryDescription.textContent = ' الدفع نقدا عند التسليم  ';
// };


// document.addEventListener("DOMContentLoaded", function() {
//     const cashOnDeliveryText = document.querySelector(".woocommerce-order").children[2];
//     cashOnDeliveryText.textContent = ' الدفع نقدا عند التسليم  ';
// });

document.addEventListener('DOMContentLoaded', function() {
    var titleCartElements = document.querySelectorAll('.title-cart');
    titleCartElements.forEach(function(element) {
        if (element.textContent.trim() === 'حدد الخيار') {
            element.textContent = ' اضف الى السلة  ';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        var titleCartElements2 = document.querySelectorAll('.add_to_cart_button');
        titleCartElements2.forEach(function(element) {
            if (element.textContent.trim() === 'حدد الخيار') {
                element.textContent = ' اضف الى السلة  ';
            }
        });
    }, 2000);
});

jQuery(document).ready(function($) {
    $('.yith-wcwl-add-to-wishlist').contents().filter(function() {
        return this.nodeType == 3 && this.nodeValue.trim() == 'COUNT TEXT';
    }).each(function() {
        this.nodeValue = '  عدد النص   ';
    });

    $('.yith-wcwl-add-to-wishlist').contents().filter(function() {
        return this.nodeType == 3 && this.nodeValue.trim() == 'ADD TO WISHLIST';
    }).each(function() {
        this.nodeValue = 'أضف إلى قائمة الرغبات  ';
    });

    $('.yith-wcwl-add-to-wishlist').contents().filter(function() {
        return this.nodeType == 3 && this.nodeValue.trim() == 'BROWSE WISHLIST MESSAGE';
    }).each(function() {
        this.nodeValue = ' تصفح رسالة قائمة الرغبات   ';
    });

    $('.add_to_cart_button').contents().filter(function() {
        return this.nodeType == 3 && this.nodeValue.trim() ==  'حدد الخيار';
    }).each(function() {
        this.nodeValue = ' اضف الى السلة  ';
    });
});


jQuery(document).ready(function($) {
    setTimeout(function() {
        var phoneField = $('#billing-phone');
        if (phoneField.length) {
            phoneField.attr('required', 'required');
            phoneField.prop('required', true);
            $('.wc-block-components-checkout-place-order-button').on('click', function() {
                if (phoneField.val() === '') {
                    phoneField.focus();
                    // return false;
                }
            });
        }
    }, 2000);
});

// jQuery(document).ready(function($) {
//     setTimeout(function() {
//         var termsText = $('.wc-block-checkout__terms span').html();
//         termsText = termsText.replace('الأحكام والشروط', '<a href="https://pinup-secret.pro/%D8%A7%D9%84%D8%A7%D8%AD%D9%83%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D8%B7-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9/" target="_blank">الأحكام والشروط</a>');
//         $('.wc-block-checkout__terms span').html(termsText);
//         var checkbox = '<input type="checkbox" id="terms_conditions_checkbox" checked> ';
//         $('.wc-block-checkout__terms span').before(checkbox);
//     }, 2000);
// });



// jQuery(document).ready(function($) {
// 	console.log("apply... apply");
// 	setTimeout(function() {
// 		var newTermsText = 'من خلال الاستمرار في عملية الشراء فإنك توافق على <a href="https://pinup-secret.pro/%D8%A7%D9%84%D8%A7%D8%AD%D9%83%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D8%B7-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9/" class="xl_custom_cls_cl" target="_blank">الأحكام والشروط</a> لدينا';
// 		$('.wc-block-checkout__terms span').html(newTermsText);
// 		var checkbox = '<input type="checkbox" id="terms_conditions_checkbox"> ';
// 		$('.wc-block-checkout__terms span').before(checkbox);

// 		$('.wc-block-components-checkout-place-order-button').on('click', function(e) {
// 			if (!$('#terms_conditions_checkbox').is(':checked')) {
// 				e.preventDefault();
// 				alert('يرجى الموافقة على الأحكام والشروط لإكمال عملية الشراء');
// 			}
// 		});
// 	}, 2000);
// });




// jQuery(document).ready(function($) {
//    console.log("apply... apply iiiiiiiii");
//    setTimeout(function() {
//        console.log("apply... apply 22222222222");
//        var termsText = $('.woocommerce-privacy-policy-text p').html();
//        termsText = termsText.replace(
//         'سياسة الخصوصية',
//         '<a href="https://staging.pinup-secret.pro/?page_id=3" target="_blank">سياسة الخصوصية</a>'
//         );
//        $('.woocommerce-privacy-policy-text p').html(termsText);
//        var checkbox = '<input type="checkbox" id="terms_conditions_checkbox" required> أوافق على الشروط والأحكام ';
//        $('.woocommerce-privacy-policy-text').before('<div class="terms-checkbox-wrapper">' + checkbox + '</div>');
//     }, 10000);
// });

// jQuery(document).ready(function($) {
//    setTimeout(function() {
//        var termsText = $('.woocommerce-privacy-policy-text p').html();
//        termsText = termsText.replace(
//         '',
//         '<a href="https://staging.pinup-secret.pro/?page_id=3" target="_blank">سياسة الخصوصية</a>'
//         );
//        $('.woocommerce-privacy-policy-text p').html(termsText);
//        var checkbox = `
//             <div class="terms-checkbox-wrapper">
//                 <label>
//                     <input type="checkbox" id="terms_conditions_checkbox" required style="display:block">
//                     أوافق على الشروط والأحكام
//                 </label>
//             </div>
//        `;
//        $('.woocommerce-privacy-policy-text').before(checkbox);
//        $(document).on('click', '#place_order', function(e) {
//         if (!$('#terms_conditions_checkbox').is(':checked')) {
//             e.preventDefault();
//             alert('يرجى تحديد خانة الاختيار للشروط والأحكام');
//         }
//     });
//    }, 9000);
// });


// jQuery(document).ready(function($) {
//     setTimeout(function() {

//         var termsHtml = `
//             <div class="terms-checkbox-wrapper">
//                 <label>
//                     <input type="checkbox" id="terms_conditions_checkbox" required>
//                     من خلال الاستمرار في عملية الشراء فإنك توافق على لدينا
//                     <a href="https://staging.pinup-secret.pro/%D8%A7%D9%84%D8%A7%D8%AD%D9%83%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D8%B7-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9/" target="_blank">الأحكام والشروط</a>
//                     و
//                     <a href="https://staging.pinup-secret.pro/?page_id=3" target="_blank">سياسة الخصوصية</a>.
//                 </label>
//             </div>
//         `;


//         $('.woocommerce-privacy-policy-text').before(termsHtml);


//         $(document).on('click', '#place_order', function(e) {
//             if (!$('#terms_conditions_checkbox').is(':checked')) {
//                 e.preventDefault();
//                 alert('يرجى تحديد خانة الاختيار للشروط والأحكام وسياسة الخصوصية');
//             }
//         });
//     }, 12000);
// });


jQuery(document).ready(function($) {
    // setTimeout(function() {
        // var updatedHtml = `
        //     <div class="woocommerce-terms-and-conditions-wrapper" style="direction: rtl; text-align: right;">
        //         <div class="terms-checkbox-wrapper">
        //             <label>
        //                 <input type="checkbox" id="terms_conditions_checkbox" required style="display:unset">
        //                 من خلال الاستمرار في عملية الشراء فإنك توافق على لدينا
        //                 <a href="https://staging.pinup-secret.pro/%D8%A7%D9%84%D8%A7%D8%AD%D9%83%D8%A7%D9%85-%D9%88%D8%A7%D9%84%D8%B4%D8%B1%D9%88%D8%B7-%D8%A7%D9%84%D8%B9%D8%A7%D9%85%D8%A9/" target="_blank">الأحكام والشروط</a>
        //                 و ياسة الخصوصية .
        //             </label>
        //         </div>
        //     </div>
        // `;
        // $('.woocommerce-terms-and-conditions-wrapper').html(updatedHtml);
    $(document).on('click', '#place_order', function(e) {
        if (!$('#terms_conditions_checkbox').is(':checked')) {
            e.preventDefault();
            alert('يرجى تحديد خانة الاختيار للشروط والأحكام وسياسة الخصوصية  ');
        }
    });
    // }, 9000);
});



jQuery(document).ready(function($) {
    $(document).on('click', '#place_order', function(e) {
        if (!$('#terms_conditions_checkbox').is(':checked')) {
            e.preventDefault();
            alert('يرجى تحديد خانة الاختيار للشروط والأحكام وسياسة الخصوصية  ');
        }
    });
});
