jQuery(document).ready(function($){
    $('#update_recurring_meshulam_form .edit_btn').each(function(){
        var _length = this.value.length + 3;
        this.style.width = _length + "ch";
        
        })
    $(document).on('change', '#main_recuring_meshulam_div .user_status_check', function() {
        if($(this).is(':checked')){
            var _val = 1;
        }
        else{
            var _val = 0;
        }
        var _order_id = $(this).attr('data-order_id');
        $('#meshulam_confirm_user_status_popup_modal .yes-rec-btn,.no-rec-btn').attr('data-value',_val);
        $('#meshulam_confirm_user_status_popup_modal .yes-rec-btn,.no-rec-btn').attr('data-order_id',_order_id);
        $('#meshulam_confirm_user_status_popup_modal').show();
        // var post_data = {};
        // post_data['action'] = 'update_user_data_meshulam_recurring_ajax';
        // post_data['order_id'] = _order_id;
        // post_data['user_status'] = _val;
        // update_meshulam_recurring_ajax(post_data);
    });
    $(document).on('click', '#main_recuring_meshulam_div .btn-edit', function() {
        $(this).prev('.edit_btn').removeAttr('disabled');
    });
    $(document).on('click', '#meshulam_confirm_popup_modal .no-rec-btn', function() {
        $('#meshulam_confirm_popup_modal').hide();
    });
    $(document).on('click', 'a.update_recurring_edit', function() {
        $('#meshulam_update_details_popup_modal').show();
    });
    $(document).on('click', '#meshulam_confirm_user_status_popup_modal .no-rec-btn', function() {
        var _order_id = $(this).attr('data-order_id');
        var _value = $(this).attr('data-value');
        $("#main_recuring_meshulam_div .user_status_check").each(function( index ) {
                if($(this).attr('data-order_id') == _order_id){
                    if(_value == 1){
                        $(this).prop("checked", false);
                    }
                    else{
                        $(this).prop("checked", true);
                    }
                }
        });
        $('#meshulam_confirm_user_status_popup_modal').hide();
    });
    $(document).on('click', '#meshulam_confirm_user_status_popup_modal .yes-rec-btn', function() {
        var _order_id = $(this).attr('data-order_id');
        var _val = $(this).attr('data-value');
        var post_data = {};
        post_data['action'] = 'update_user_data_meshulam_recurring_ajax';
        post_data['order_id'] = _order_id;
        post_data['user_status'] = _val;
        update_meshulam_recurring_ajax(post_data);
    });
    $(document).on('click', '#meshulam_confirm_popup_modal .yes-rec-btn', function() {
        var _form_data = $( "#update_recurring_meshulam_form" ).serializeArray();
        var post_data = {};
        post_data['action'] = 'update_user_data_meshulam_recurring_ajax';
        for(var i=0; i< _form_data.length; i++) {
            var _key = _form_data[i]['name'];
            var _value = _form_data[i]['value'];
            post_data[_key] = _value;
          }
        update_meshulam_recurring_ajax(post_data);
    });
    $(document).on('click', '#main_recuring_meshulam_div .edit-field .icon-check', function() {
        $('#meshulam_confirm_popup_modal').show();
    });
    $(document).on('click', '#main_recuring_meshulam_div .btn-opstion .icon-close', function() {
        $(this).parent().parent().find('.edit_btn').attr('disabled','disabled');
    });
    $(document).on('click', '#main_recuring_meshulam_div .update_card_btn_order', function() {
            var _val = 1;
        var _order_id = $(this).attr('data-order_id');
        var post_data = {};
        post_data['action'] = 'update_user_data_meshulam_recurring_ajax';
        post_data['order_id'] = _order_id;
        post_data['update_card'] = _val;
        update_meshulam_recurring_ajax(post_data);
    });
    $(document).on('click', '.meshulam_modal .meshulam_modal_container .meshulam_modal_body .btn-edit', function() {
        $(this).hide();
        $(this).prev('input,select').removeAttr("disabled").focus();
        $(this).next().show();
    });
    $(document).on('click', '.meshulam_modal .meshulam_modal_container .meshulam_modal_body .dashicons-no-alt', function() {
        $(this).parent().parent().find('input,select').prop("disabled", true);
        $(this).parent().parent().find('.btn-edit').show();
        $(this).parent('.btn-opstion').hide();
    });
    $(document).on('click', '#meshulam_update_details_popup_modal .modal-close', function() {
        jQuery('#meshulam_update_details_popup_modal').hide();
    });
    $(document).on('click', '.meshulam_modal .modal-close', function() {
        jQuery('#meshulam_recurring_order_modal').hide();
    });
});
function TheMeshulamRecurringModal(){
    jQuery('#meshulam_recurring_order_modal').show();
}
function TheMeshulamRecurringModalClose(){
    jQuery('#meshulam_recurring_order_modal').hide();
}
function update_meshulam_recurring_ajax(post_data){
    
    jQuery.ajax({
        type: 'POST',
        url: mes_rec.ajax_url,
        dataType: 'html',
        data: post_data,
        beforeSend: function() {
            jQuery('.recurring_loader').css('visibility','visible');
        },
        success: function(response) {
            jQuery('.recurring_loader').css('visibility','hidden');
            jQuery('#meshulam_confirm_user_status_popup_modal').hide();
            jQuery('#meshulam_confirm_popup_modal').hide();
            if(post_data['update_card'] != undefined){
                if(isValidJSONString(response)){
                    var _json = jQuery.parseJSON(response);
                    if(_json.data){
                        jQuery('#meshulam_recurring_order_modal').show();
                        jQuery('#update_card_iframe').attr('src',_json.data);
                    }
                }
            }
        }
    });
}
function isValidJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}