/* FUNCIONES PARA IGUALAR CAJAS EN ALTURA */
/*Variables definidas para maquetación, modificar en producción*/
var carpetaAjax="ajaxLoad";//Carpeta para las cargas AJAX
function equalHeight(group) {
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	group.height(tallest);
}

// Ejecuto funciones al inicio
$(document).ready(function() {
	// Ejecuto función para listado multicolumna
	//$('.mcol').makeacolumnlists({cols: 2, colWidth: 0, equalHeight: 'ul', startN: 1});

	// Igualos en altura divs
	equalHeight($(".colshome"));
	equalHeight($(".colsseo"));
	equalHeight($(".cols"));
	equalHeight($(".cols2"));
	equalHeight($(".cols3"));
	equalHeight($(".cols4"));
	equalHeight($(".colsDts"));

	/* Carga de cambio de diseño en los select y los checkbox y radio buttons y los datepickers*/
	$('.ng .js-select-periscop').dropkick({ 
		theme : 'periscop-ng',
		width: 99,
		change: function (value, label) {
        	$('#'+$(this).attr('id')).val(value);
        	$(this).trigger("change"); 
		}
	});
	$('.js-select-periscop').dropkick({ 
		theme : 'periscop',
		width: 99,
		change: function (value, label) {
        	$('#'+$(this).attr('id')).val(value);
        	$(this).trigger("change");
		}
	});
	$('.rc input').ezMark();
	$( ".js-datepicker" ).datepicker({
		numberOfMonths: 2,
		showButtonPanel: true,
		showOn: "both",
		dateFormat: "dd-mm-yy" 
	});

	/* Pestañas menu superior de navegación */
	$(".js-head-nav1-ctd a.js-close").live('click', function(event){
		event.preventDefault();
		$('.js-head-nav1').find('li').each(function(){ $(this).removeClass('active'); });
		$('.js-head-nav1-ctd > .js-head-nav1-tab').slideUp();
		$('.js-head-nav2').find('li').each(function(){ $(this).removeClass('active'); });
		$('.js-head-nav2').find('li:first').each(function(){ $(this).addClass('active'); });
		$('.js-head-nav3').find('li').each(function(){ $(this).removeClass('active'); });
		$('.js-head-nav3').find('li:first').each(function(){ $(this).addClass('active'); });
		$('.head-nav2-ctd').find('div.head-nav2-tab').each(function(){ $(this).removeClass('active'); });
		$('.head-nav2-ctd').find('div.head-nav2-tab:first').each(function(){ $(this).addClass('active'); });
		$('.head-nav3-ctd').find('div.head-nav3-tab').each(function(){ $(this).removeClass('active'); });
		$('.head-nav3-ctd').find('div.head-nav3-tab:first').each(function(){ $(this).addClass('active');	});
	});
	
	/*Cargas de las pestañas de la barra superior de navegación*/
	$('.js-head-link').click(function(event){
		$('.js-head-nav1').find('li').each(function(){ $(this).removeClass('active'); });
		item=$(this).parent('li');
		$('#js-head-target').load(carpetaAjax+'/'+$(this).attr('href'),
			function(){
				//Customización de selects, datepcikers y checkboxes
				if(('#js-head-target form').length){
					$('.ng .js-select-periscop').dropkick({ 
						theme : 'periscop-ng',
						width: 99,
						change: function (value, label) {
				        	$('#'+$(this).attr('id')).val(value);
				        	$(this).trigger("change"); 
						}
					});
					$('.rc input').ezMark();
					$( ".js-datepicker" ).datepicker({
						numberOfMonths: 2,
						showButtonPanel: true,
						showOn: "both",
						dateFormat: "dd-mm-yy" 
					});
				}
				item.addClass('active');
				$('#js-head-target').fadeIn().animate({height: $('.padd').height+'px'},function(){
					item.addClass('active');
				})
			}
		)
		event.preventDefault();
	})
	/* Comportamiento de tags */
	$(".list-tags li").click(function(event){
	   var cl = $(this).attr("class");
       if (cl == '' || cl == undefined) {
		   cl = 'active';
	   } else {
		   cl = '';
	   }

	   $(this).removeClass();
	   $(this).addClass(cl);
    });

	/* Inicializo sliders superiores */
	$('.js-carousel1').carousel({ interval: 99999 });
	$('.js-carousel2').carousel({ interval: 99999 });
	$('.js-carousel3').carousel({ interval: 99999 });
	$('.js-carousel4').carousel({ interval: 99999 });
	$('.js-carousel5').carousel({ interval: 99999 });
	$('.js-carousel6').carousel({ interval: 99999 });
	$('.js-carousel7').carousel({ interval: 99999 });
	$('.js-carousel8').carousel({ interval: 99999 });
	$('.js-carousel9').carousel({ interval: 99999 });
	$('.js-carousel-blog').carousel({ interval: 5000 });
	$('.js-instagram-blog').carousel({ interval: 99999 });

});