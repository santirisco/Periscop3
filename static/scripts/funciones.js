/** 
#  * Copyright (c) 2008 Pasyuk Sergey (www.codeasily.com) 
#  * Licensed under the MIT License: 
#  * http://www.opensource.org/licenses/mit-license.php 
#  *  
#  * Splits a <ul>/<ol>-list into equal-sized columns. 
#  *  
#  * Requirements:  
#  * <ul> 
#  * <li>"ul" or "ol" element must be styled with margin</li> 
#  * </ul> 
#  *  
#  * @see http://www.codeasily.com/jquery/multi-column-list-with-jquery 
#  */  
jQuery.fn.makeacolumnlists = function(settings){
	settings = jQuery.extend({
		cols: 2,				// set number of columns
		colWidth: 0,			// set width for each column or leave 0 for auto width
		equalHeight: false, 	// can be false, 'ul', 'ol', 'li'
		startN: 1				// first number on your ordered list
	}, settings);

	if(jQuery('> li', this)) { 
		this.each(function(y) {
			var y=jQuery('.li_container').size(),
		    	height = 0, 
		        maxHeight = 0,
				t = jQuery(this),
				classN = t.attr('class'),
				listsize = jQuery('> li', this).size(),
				percol = Math.ceil(listsize/settings.cols),
				contW = t.width(),
				bl = ( isNaN(parseInt(t.css('borderLeftWidth'),10)) ? 0 : parseInt(t.css('borderLeftWidth'),10) ),
				br = ( isNaN(parseInt(t.css('borderRightWidth'),10)) ? 0 : parseInt(t.css('borderRightWidth'),10) ),
				pl = parseInt(t.css('paddingLeft'),10),
				pr = parseInt(t.css('paddingRight'),10),
				ml = parseInt(t.css('marginLeft'),10),
				mr = parseInt(t.css('marginRight'),10),
				col_Width = Math.floor((contW - (settings.cols-1)*(bl+br+pl+pr+ml+mr))/settings.cols);
			if (settings.colWidth) {
				col_Width = settings.colWidth; 
			}
			var colnum=1,
				percol2=percol;
			jQuery(this).addClass('li_cont1').wrap('<div id="li_container' + (++y) + '" class="li_container"></div>');
			for (var i=0; i<=listsize; i++) {
				if(i>=percol2) { percol2+=percol; colnum++; }
				var eq = jQuery('> li:eq('+i+')',this);
				eq.addClass('li_col'+ colnum);
				if(jQuery(this).is('ol')){eq.attr('value', ''+(i+settings.startN))+'';}
			}
			jQuery(this).css({cssFloat:'left', width:''+col_Width+'px'});
			for (colnum=2; colnum<=settings.cols; colnum++) {
				if(jQuery(this).is('ol')) {
					jQuery('li.li_col'+ colnum, this).appendTo('#li_container' + y).wrapAll('<ol class="li_cont'+colnum +' ' + classN + '" style="float:left; width: '+col_Width+'px;"></ol>');
				} else {
					jQuery('li.li_col'+ colnum, this).appendTo('#li_container' + y).wrapAll('<ul class="li_cont'+colnum +' ' + classN + '" style="float:left; width: '+col_Width+'px;"></ul>');
				}
			}
			if (settings.equalHeight=='li') {
				for (colnum=1; colnum<=settings.cols; colnum++) {
				    jQuery('#li_container'+ y +' li').each(function() {
				        var e = jQuery(this);
				        var border_top = ( isNaN(parseInt(e.css('borderTopWidth'),10)) ? 0 : parseInt(e.css('borderTopWidth'),10) );
				        var border_bottom = ( isNaN(parseInt(e.css('borderBottomWidth'),10)) ? 0 : parseInt(e.css('borderBottomWidth'),10) );
				        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
				        maxHeight = (height > maxHeight) ? height : maxHeight;
				    });
				}
				for (colnum=1; colnum<=settings.cols; colnum++) {
					var eh = jQuery('#li_container'+ y +' li');
			        var border_top = ( isNaN(parseInt(eh.css('borderTopWidth'),10)) ? 0 : parseInt(eh.css('borderTopWidth'),10) );
			        var border_bottom = ( isNaN(parseInt(eh.css('borderBottomWidth'),10)) ? 0 : parseInt(eh.css('borderBottomWidth'),10) );
					mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom );
			        eh.height(mh);
				}
			} else 
			if (settings.equalHeight=='ul' || settings.equalHeight=='ol') {
				for (colnum=1; colnum<=settings.cols; colnum++) {
				    jQuery('#li_container'+ y +' .li_cont'+colnum).each(function() {
				        var e = jQuery(this);
				        var border_top = ( isNaN(parseInt(e.css('borderTopWidth'),10)) ? 0 : parseInt(e.css('borderTopWidth'),10) );
				        var border_bottom = ( isNaN(parseInt(e.css('borderBottomWidth'),10)) ? 0 : parseInt(e.css('borderBottomWidth'),10) );
				        height = e.height() + parseInt(e.css('paddingTop'), 10) + parseInt(e.css('paddingBottom'), 10) + border_top + border_bottom;
				        maxHeight = (height > maxHeight) ? height : maxHeight;
				    });
				}
				for (colnum=1; colnum<=settings.cols; colnum++) {
					var eh = jQuery('#li_container'+ y +' .li_cont'+colnum);
			        var border_top = ( isNaN(parseInt(eh.css('borderTopWidth'),10)) ? 0 : parseInt(eh.css('borderTopWidth'),10) );
			        var border_bottom = ( isNaN(parseInt(eh.css('borderBottomWidth'),10)) ? 0 : parseInt(eh.css('borderBottomWidth'),10) );
					mh = maxHeight - (parseInt(eh.css('paddingTop'), 10) + parseInt(eh.css('paddingBottom'), 10) + border_top + border_bottom );
			        eh.height(mh);
				}
			}
		    jQuery('#li_container' + y).append('<div style="clear:both; overflow:hidden; height:0px;"></div>');
		});
	}
}

jQuery.fn.uncolumnlists = function(){
	jQuery('.li_cont1').each(function(i) {
		var onecolSize = jQuery('#li_container' + (++i) + ' .li_cont1 > li').size();
		if(jQuery('#li_container' + i + ' .li_cont1').is('ul')) {
			jQuery('#li_container' + i + ' > ul > li').appendTo('#li_container' + i + ' ul:first');
			for (var j=1; j<=onecolSize; j++) {
				jQuery('#li_container' + i + ' ul:first li').removeAttr('class').removeAttr('style');
			}
			jQuery('#li_container' + i + ' ul:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
		} else {
			jQuery('#li_container' + i + ' > ol > li').appendTo('#li_container' + i + ' ol:first');
			for (var j=1; j<=onecolSize; j++) {
				jQuery('#li_container' + i + ' ol:first li').removeAttr('class').removeAttr('style');
			}
			jQuery('#li_container' + i + ' ol:first').removeAttr('style').removeClass('li_cont1').insertBefore('#li_container' + i);
		}
		jQuery('#li_container' + i).remove();
	});
}

/*
 * jQuery PlaceHolder 1.0.6
 * http://www.kegles.com.br/jquery-placeholder/
 *
 * Copyright 2011, Nataniel Kegles
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Octuber 2011
 *
 * ****************
 * ** HOW TO USE **
 * ****************
 * - Add holder="text" to inputs or textareas
 * - Use input.holder CSS class to style holdered fields
 *
 * - WARNING: ALL HOLD INPUTS MUST HAVE "ID" TAG
 *
 * ****************
 * ** CHANGELOG! **
 * ****************
 * Version: 1.0.6 - Date: 2012-05-23
 *  - Added support for textareas
 * Version: 1.0.5 - Date: 2011-11-05
 *  - Fixed critical bug listing fields
 * Version: 1.0.4 - Date: 2011-11-03
 *  - Fixed critical bug (.holder css class)
 * Version: 1.0.3 - Date: 2011-11-03
 *  - Fixed field listing parameters
 *  - Fixed focus issue in hidden fake fields
 *  - Fixed issue when data changed dynamically
 *  - Fixed issue before form submit (cleaning fields)
 * Version: 1.0.2 - Date: 2011-10-31
 *  - Improved search for holding fields with "holder!=''"
 *  - Solved compatibility issues with jQuery.meiomask
 *  - Added password fields compatibility
 */

//search by holder fields
$(document).ready(function() {
	$("input[type=text],input[type=password],textarea").each(function(){
		if ($.trim($(this).attr("holder")) != "" && $.trim($(this).val() == "")) {
			var field = $(this);
			var ffield = $(field).attr("id")+"__jquery_placeholder_passwordFakeField";
			//replace password fields with a fake field
			if ($(field).attr("type") == "password") {
				var newfield  = $("<input type='text' class='"+$(field).attr("class")+"' id='"+ffield+"' tabindex='"+$(field).attr("tabindex")+"' holder='"+$(field).attr("holder")+"' />").focus(function() {
									$(this).hide();
									$(field).show();
									$(field).focus();
								}).keypress(function(event) {
									event.preventDefault();
								});
				$(newfield).insertBefore(field);
				$(field).hide();
			}
			//bind focus event
			$(field).bind("focus",function() {
				$("#"+ffield).hide();
				$(field).show();
				if ($(field).hasClass("holder")) {
					$(field).val("");
					$(field).removeClass("holder");
				}
			});
			//bind blur event, if is a password field and value='' show the fakefield
			$(field).bind("blur",function() {
				if ($(field).val() == "") {
					if ($(field).attr("type") == "password") {
						$(field).hide();
						$("#"+ffield).show();
					}
					else {
						$(field).val($(field).attr("holder"));
						$(field).addClass("holder");
					}
				}
			});
			//bind change event, if value changed return to non holding state
			$(field).bind("change",function() {
				$(field).removeClass("holder");
			});
			//bind parent form submit, clean holding fields
			$(field).parents("form").submit(function() {
			  $(this).find(".holder").each(function() {
				if ($(this).val() == $(this).attr("holder")) { $(this).val(""); }
			  });
			});
		}
	});
	setTimeout("__jquery_placeholder_goTitling()",100);
});
//change the holding values
function __jquery_placeholder_goTitling() {
	$("input[type=text],textarea").each(function(){
		if (($(this).attr("holder") != "") && ($.trim($(this).val()) == "")) {
			$(this).val($(this).attr("holder"));
			$(this).addClass("holder");
		}
	});
}

$(document).ready(
	/* Función para añadir la funcionalidad de paginación a los sliders */
	function() {
		$('.carousel[id]').each(
			function() {
				var html = '<div class="carousel-nav" data-target="' + $(this).attr('id') + '"><ul>';
				for(var i = 0; i < $(this).find('.item').size(); i ++) {
					html += '<li><a';
					if(i == 0) {
						html += ' class="active"';
					}
					html += ' href="#">' + (i+1) + '</a></li>';
				}
				html += '</ul></li>';
				$(this).find('.carousel-control.right').each(function(){ 
					$(this).after(html);
				});
			}
		).bind('slid',
		function(e) {
			var nav = $('.carousel-nav[data-target="' + $(this).attr('id') + '"] ul');
			var index = $(this).find('.item.active').index();
			var item = nav.find('li').get(index);
			nav.find('li a.active').removeClass('active');
			$(item).find('a').addClass('active');
		}
	);

	$('.carousel-nav a').bind('click',
		function(e) {
			var index = $(this).parent().index();
			var carousel = $('#' + $(this).closest('.carousel-nav').attr('data-target'));
			carousel.carousel(index);
			e.preventDefault();
		}
	);
});  

// Función para mostrar elementos desde un select
var viewBlock = function(id, value) {
	$('.'+id).each(function() { 
		$(this).removeClass("show");
    });
	for(var i=0;i<=value;i++) {
		var idi = '#'+id+'-'+i;
		if ($(idi).length) {
			$(idi).addClass("show");
		}
	}
};