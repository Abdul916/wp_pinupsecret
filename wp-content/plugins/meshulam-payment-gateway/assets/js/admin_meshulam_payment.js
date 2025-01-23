jQuery(document).ready(function(){
	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};
	if(getUrlParameter('section') == 'meshulam-payment' || getUrlParameter('section') == 'bitpay-payment' || getUrlParameter('section') == 'apple-payment' || getUrlParameter('section') == 'cal-payment' || getUrlParameter('section') == 'googlepay-payment' || getUrlParameter('section') == 'grow-wallet-payment'){   
		if(jQuery("#woocommerce_meshulam-payment_j5_mode").hasClass('hide-input')){
			jQuery('#woocommerce_meshulam-payment_j5_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_bitpay-payment_j5_mode").hasClass('hide-input')){
			jQuery('#woocommerce_bitpay-payment_j5_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_apple-payment_j5_mode").hasClass('hide-input')){
			jQuery('#woocommerce_apple-payment_j5_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_grow-wallet-payment_j5_mode").hasClass('hide-input')){
			jQuery('#woocommerce_grow-wallet-payment_j5_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_grow-wallet-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_grow-wallet-payment_refund_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_cal-payment_j5_mode").hasClass('hide-input')){
			jQuery('#woocommerce_cal-payment_j5_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_googlepay-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_googlepay-payment_refund_mode').parents('tr').hide();
		}


		if(jQuery("#woocommerce_meshulam-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_meshulam-payment_refund_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_bitpay-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_bitpay-payment_refund_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_apple-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_apple-payment_refund_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_cal-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_cal-payment_refund_mode').parents('tr').hide();
		}
		if(jQuery("#woocommerce_googlepay-payment_refund_mode").hasClass('hide-input')){
			jQuery('#woocommerce_googlepay-payment_refund_mode').parents('tr').hide();
		}
		jQuery('#woocommerce_meshulam-payment_wrap_detail,#woocommerce_meshulam-payment_wrap_detail+.form-table,#woocommerce_meshulam-payment_thank_you_page_details,#woocommerce_meshulam-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('#woocommerce_apple-payment_wrap_detail,#woocommerce_apple-payment_wrap_detail+.form-table,#woocommerce_apple-payment_thank_you_page_details,#woocommerce_apple-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('#woocommerce_cal-payment_wrap_detail,#woocommerce_cal-payment_wrap_detail+.form-table,#woocommerce_cal-payment_thank_you_page_details,#woocommerce_cal-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('#woocommerce_googlepay-payment_wrap_detail,#woocommerce_googlepay-payment_wrap_detail+.form-table,#woocommerce_googlepay-payment_thank_you_page_details,#woocommerce_googlepay-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('#woocommerce_meshulam-bit-payment_wrap_detail,#woocommerce_meshulam-bit-payment_wrap_detail+.form-table,#woocommerce_bitpay-payment_thank_you_page_details,#woocommerce_bitpay-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('#woocommerce_grow-wallet-payment_wrap_detail,#woocommerce_grow-wallet-payment_wrap_detail+.form-table,#woocommerce_grow-wallet-payment_thank_you_page_details,#woocommerce_grow-wallet-payment_thank_you_page_details+.form-table').wrapAll("<div class='meshulam_left_col'></div>" );
		jQuery('.meshulam_left_col').children().wrapAll("<div class='wrapper'></div>" );
		jQuery('.woocommerce table.form-table:first,#woocommerce_meshulam-payment_paymentsettings,#woocommerce_meshulam-payment_paymentsettings+.form-table').wrapAll("<div class='meshulam_right_col'></div>" );
		jQuery('.woocommerce table.form-table:first,#woocommercemeshulam-bit-payment_meshulam-bit-payment_paymentsettings,#woocommerce_meshulam-bit-payment_paymentsettings+.form-table').wrapAll("<div class='meshulam_right_col'></div>" );
		jQuery('.woocommerce table.form-table:first,#woocommerce_grow-wallet-payment_paymentsettings,#woocommerce_grow-wallet-payment_paymentsettings+.form-table').wrapAll("<div class='meshulam_right_col'></div>" );
	}
	jQuery('#woocommerce_meshulam-payment_maxpayment').parents('tr').hide();
	jQuery('#woocommerce_grow-wallet-payment_maxpayment').parents('tr').hide();
	jQuery('#woocommerce_apple-payment_maxpayment').parents('tr').hide();
	jQuery('#woocommerce_cal-payment_maxpayment').parents('tr').hide();
	jQuery('#woocommerce_googlepay-payment_maxpayment').parents('tr').hide();
	/* check payment type */
	if(jQuery('#woocommerce_meshulam-payment_payment_type').val() == 'regular_1'){
		jQuery('.meshulam_acc').hide();
		jQuery('#woocommerce_meshulam-payment_maxpayment').prop('readonly', true);
	}else{

	}
	//check payment type on page load and hide next div
	jQuery('#woocommerce_grow-wallet-payment_payment_type :selected').each(function(i){
		if(jQuery(this).val() == 'payments_4'){
			jQuery('#woocommerce_grow-wallet-payment_maxpayment').parents('tr').show();
		}
	});
	jQuery('#woocommerce_meshulam-payment_payment_type :selected').each(function(i){
		if(jQuery(this).val() == 'payments_4'){
			jQuery('#woocommerce_meshulam-payment_maxpayment').parents('tr').show();
		}
	});
	jQuery('#woocommerce_apple-payment_payment_type :selected').each(function(i){
		if(jQuery(this).val() == 'payments_4'){
			jQuery('#woocommerce_apple-payment_maxpayment').parents('tr').show();
		}
	});
	jQuery('#woocommerce_cal-payment_payment_type :selected').each(function(i){
		if(jQuery(this).val() == 'payments_4'){
			jQuery('#woocommerce_cal-payment_maxpayment').parents('tr').show();
		}
	});
	jQuery('#woocommerce_googlepay-payment_payment_type :selected').each(function(i){
		if(jQuery(this).val() == 'payments_4'){
			jQuery('#woocommerce_googlepay-payment_maxpayment').parents('tr').show();
		}
	});
	jQuery('.meshulam_left_col input,.meshulam_right_col input').each(function(){
		jQuery(this).attr('autocomplete','false');
	})
	if(jQuery("#woocommerce_meshulam-payment_j5_mode").length != 0) {
	var j5check = document.getElementById("woocommerce_meshulam-payment_j5_mode");
	  if (j5check.checked == true){
		jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').hide();
	  } else {
		jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').show();
	  }
	}
	/* on change */
	jQuery('#woocommerce_meshulam-payment_j5_mode').change(function(){
		if (this.checked == true){
			jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').hide();
		  } else {
			jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').show();
		  }
	});
	if(jQuery("#woocommerce_bitpay-payment_j5_mode").length != 0) {
		var j5check = document.getElementById("woocommerce_bitpay-payment_j5_mode");
		  if (j5check.checked == true){
			jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').hide();
		  } else {
			jQuery('#woocommerce_meshulam-payment_order_status').parents('tr').show();
		  }
		}
		/* on change */
		jQuery('#woocommerce_bitpay-payment_j5_mode').change(function(){
			if (this.checked == true){
				jQuery('#woocommerce_bitpay-payment_order_status').parents('tr').hide();
			  } else {
				jQuery('#woocommerce_bitpay-payment_order_status').parents('tr').show();
			  }
		});
		if(jQuery("#woocommerce_apple-payment_j5_mode").length != 0) {
			var j5check = document.getElementById("woocommerce_apple-payment_j5_mode");
			  if (j5check.checked == true){
				jQuery('#woocommerce_apple-payment_order_status').parents('tr').hide();
			  } else {
				jQuery('#woocommerce_apple-payment_order_status').parents('tr').show();
			  }
			}
			/* on change */
			jQuery('#woocommerce_apple-payment_j5_mode').change(function(){
				if (this.checked == true){
					jQuery('#woocommerce_apple-payment_order_status').parents('tr').hide();
				  } else {
					jQuery('#woocommerce_apple-payment_order_status').parents('tr').show();
				  }
			});

			if(jQuery("#woocommerce_cal-payment_j5_mode").length != 0) {
				var j5check = document.getElementById("woocommerce_cal-payment_j5_mode");
				  if (j5check.checked == true){
					jQuery('#woocommerce_cal-payment_order_status').parents('tr').hide();
				  } else {
					jQuery('#woocommerce_cal-payment_order_status').parents('tr').show();
				  }
				}
				/* on change */
				jQuery('#woocommerce_cal-payment_j5_mode').change(function(){
					if (this.checked == true){
						jQuery('#woocommerce_cal-payment_order_status').parents('tr').hide();
					  } else {
						jQuery('#woocommerce_cal-payment_order_status').parents('tr').show();
					  }
				});
				if(jQuery("#woocommerce_googlepay-payment_j5_mode").length != 0) {
					var j5check = document.getElementById("woocommerce_googlepay-payment_j5_mode");
					  if (j5check.checked == true){
						jQuery('#woocommerce_googlepay-payment_order_status').parents('tr').hide();
					  } else {
						jQuery('#woocommerce_googlepay-payment_order_status').parents('tr').show();
					  }
					}
					/* on change */
					jQuery('#woocommerce_googlepay-payment_j5_mode').change(function(){
						if (this.checked == true){
							jQuery('#woocommerce_googlepay-payment_order_status').parents('tr').hide();
						  } else {
							jQuery('#woocommerce_googlepay-payment_order_status').parents('tr').show();
						  }
					});
	jQuery('#woocommerce_grow-wallet-payment_payment_type').change(function(){
		jQuery('#woocommerce_grow-wallet-payment_maxpayment').parents('tr').hide();
		if(jQuery(this).val() == 'regular_1'){
			jQuery('.meshulam_acc').hide();
		}else{
			if(jQuery(this).val() == 'direct_debit_2'){
			}else{   
				jQuery('#woocommerce_grow-wallet-payment_maxpayment').attr('max', 12);
			} 
		}
		jQuery('#woocommerce_grow-wallet-payment_payment_type :selected').each(function(i){
			if(jQuery(this).val() == 'payments_4'){
				jQuery('#woocommerce_grow-wallet-payment_maxpayment').parents('tr').show();
			}
		});
	})
	jQuery('#woocommerce_meshulam-payment_payment_type').change(function(){
		jQuery('#woocommerce_meshulam-payment_maxpayment').parents('tr').hide();
		if(jQuery(this).val() == 'regular_1'){
			jQuery('.meshulam_acc').hide();
		}else{
			if(jQuery(this).val() == 'direct_debit_2'){
			}else{   
				jQuery('#woocommerce_meshulam-payment_maxpayment').attr('max', 12);
			} 
		}
		jQuery('#woocommerce_meshulam-payment_payment_type :selected').each(function(i){
			if(jQuery(this).val() == 'payments_4'){
				jQuery('#woocommerce_meshulam-payment_maxpayment').parents('tr').show();
			}
		});
	})
	jQuery('#woocommerce_apple-payment_payment_type').change(function(){
		jQuery('#woocommerce_apple-payment_maxpayment').parents('tr').hide();
		jQuery('#woocommerce_apple-payment_payment_type :selected').each(function(i){
			if(jQuery(this).val() == 'payments_4'){
				jQuery('#woocommerce_apple-payment_maxpayment').parents('tr').show();
			}
		});
	})
	jQuery('#woocommerce_cal-payment_payment_type').change(function(){
		jQuery('#woocommerce_cal-payment_maxpayment').parents('tr').hide();
		jQuery('#woocommerce_cal-payment_payment_type :selected').each(function(i){
			if(jQuery(this).val() == 'payments_4'){
				jQuery('#woocommerce_cal-payment_maxpayment').parents('tr').show();
			}
		});
	})
	jQuery('#woocommerce_googlepay-payment_payment_type').change(function(){
		jQuery('#woocommerce_googlepay-payment_maxpayment').parents('tr').hide();
		jQuery('#woocommerce_googlepay-payment_payment_type :selected').each(function(i){
			if(jQuery(this).val() == 'payments_4'){
				jQuery('#woocommerce_googlepay-payment_maxpayment').parents('tr').show();
			}
		});
	})
	jQuery('input[value="meshulam_pay_card_token_detail"]').parents('tr').hide();
	jQuery('input[value="meshulam_pay_payment-type"]').parents('tr').hide();
	jQuery('input[value="meshulam_pay_save_card"]').parents('tr').hide();
	jQuery('input[value="meshulam_pay_transaction-id"]').parents('tr').hide();
	jQuery('input[value="meshulam_pay_payment-number"]').parents('tr').hide();
	jQuery('input[value="meshulam-pay-description"]').parents('tr').hide();
	jQuery('input[value="transactionid"]').parents('tr').hide();
	jQuery('input[value="payment_transaction_id"]').parents('tr').hide();
	jQuery('.woocommerce .meshulam_right_col table.form-table select[multiple]').multiselect({
		buttonWidth : '160px',
		includeSelectAllOption : true,
		nonSelectedText: 'Select an Option'
	});
	if(jQuery('#woocommerce_meshulam-payment_business_owner_code').val() != '' && jQuery('#woocommerce_meshulam-payment_payment_type').val() != '' && jQuery('#woocommerce_meshulam-payment_fail_url').val() != '' && jQuery('#woocommerce_meshulam-payment_thank_you_page').val() != ''){
	}else{
	}
	if(jQuery('input#woocommerce_bitpay-payment_show_thank_you_detail').is(':checked')){
		jQuery('#woocommerce_bitpay-payment_thank_you_page').parents('tr').show();
		jQuery('#woocommerce_bitpay-payment_fail_url').parents('tr').show();
	}
	else{
		jQuery('#woocommerce_bitpay-payment_thank_you_page').parents('tr').hide();
		jQuery('#woocommerce_bitpay-payment_fail_url').parents('tr').hide();
	}

	if(jQuery('input#woocommerce_meshulam-payment_show_thank_you_detail').is(':checked')){
		jQuery('#woocommerce_meshulam-payment_thank_you_page').parents('tr').show();
		jQuery('#woocommerce_meshulam-payment_fail_url').parents('tr').show();
	}else{
		jQuery('#woocommerce_meshulam-payment_thank_you_page').parents('tr').hide();
		jQuery('#woocommerce_meshulam-payment_fail_url').parents('tr').hide();
	}
	jQuery('input#woocommerce_bitpay-payment_show_thank_you_detail').change(function(){
		if(jQuery(this).is(':checked')){
			jQuery('#woocommerce_bitpay-payment_thank_you_page').parents('tr').show();
			jQuery('#woocommerce_bitpay-payment_fail_url').parents('tr').show();
		}else{
			jQuery('#woocommerce_bitpay-payment_thank_you_page').parents('tr').hide();
			jQuery('#woocommerce_bitpay-payment_fail_url').parents('tr').hide();
		}
	})
	jQuery('input#woocommerce_meshulam-payment_show_thank_you_detail').change(function(){
		if(jQuery(this).is(':checked')){
			jQuery('#woocommerce_meshulam-payment_thank_you_page').parents('tr').show();
			jQuery('#woocommerce_meshulam-payment_fail_url').parents('tr').show();
		}else{
			jQuery('#woocommerce_meshulam-payment_thank_you_page').parents('tr').hide();
			jQuery('#woocommerce_meshulam-payment_fail_url').parents('tr').hide();
		}
	})
})
function getSelectedValues() {
	var selectedVal = jQuery(".woocommerce .meshulam_right_col table.form-table select[multiple]").val();
	for(var i=0; i<selectedVal.length; i++){
		function innerFunc(i) {
			setTimeout(function() {
				location.href = selectedVal[i];
			}, i*2000);
		}
		innerFunc(i);
	}
}	