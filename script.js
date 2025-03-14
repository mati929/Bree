(function(root,factory){if(typeof exports==="object"){module.exports=factory(root)}else if(typeof define==="function"&&define.amd){define([],factory)}else{root.LazyLoad=factory(root)}})(typeof global!=="undefined"?global:this.window||this.global,function(root){"use strict";if(typeof define==="function"&&define.amd){root=window}
const defaults={src:"data-src",srcset:"data-srcset",selector:".lazyload",root:null,rootMargin:"0px",threshold:0};const extend=function(){let extended={};let deep=!1;let i=0;let length=arguments.length;if(Object.prototype.toString.call(arguments[0])==="[object Boolean]"){deep=arguments[0];i++}
let merge=function(obj){for(let prop in obj){if(Object.prototype.hasOwnProperty.call(obj,prop)){if(deep&&Object.prototype.toString.call(obj[prop])==="[object Object]"){extended[prop]=extend(!0,extended[prop],obj[prop])}else{extended[prop]=obj[prop]}}}};for(;i<length;i++){let obj=arguments[i];merge(obj)}
return extended};function LazyLoad(images,options){this.settings=extend(defaults,options||{});this.images=images||document.querySelectorAll(this.settings.selector);this.observer=null;this.init()}
LazyLoad.prototype={init:function(){if(!root.IntersectionObserver){this.loadImages();return}
let self=this;let observerConfig={root:this.settings.root,rootMargin:this.settings.rootMargin,threshold:[this.settings.threshold]};this.observer=new IntersectionObserver(function(entries){Array.prototype.forEach.call(entries,function(entry){if(entry.isIntersecting){self.observer.unobserve(entry.target);let src=entry.target.getAttribute(self.settings.src);let srcset=entry.target.getAttribute(self.settings.srcset);if("img"===entry.target.tagName.toLowerCase()){if(src){entry.target.src=src;entry.target.removeAttribute("data-src");entry.target.classList.add("loaded")}
if(srcset){entry.target.srcset=srcset}}else{entry.target.style.backgroundImage="url("+src+")"}}})},observerConfig);Array.prototype.forEach.call(this.images,function(image){self.observer.observe(image)})},loadAndDestroy:function(){if(!this.settings){return}
this.loadImages();this.destroy()},loadImages:function(){if(!this.settings){return}
let self=this;Array.prototype.forEach.call(this.images,function(image){let src=image.getAttribute(self.settings.src);let srcset=image.getAttribute(self.settings.srcset);if("img"===image.tagName.toLowerCase()){if(src){image.src=src}
if(srcset){image.srcset=srcset}}else{image.style.backgroundImage="url('"+src+"')"}})},destroy:function(){if(!this.settings){return}
this.observer.disconnect();this.settings=null}};root.lazyload=function(images,options){return new LazyLoad(images,options)};if(root.jQuery){const $=root.jQuery;$.fn.lazyload=function(options){options=options||{};options.attribute=options.attribute||"data-src";new LazyLoad($.makeArray(this),options);return this}}
return LazyLoad})

var ajax_;
$(document).ready(function(){

    //Apagar luces en el player
    $('.lgtbx-lnk').on('click', function(event) {
        event.preventDefault();
        if( $('body').hasClass('lights-off') ) {
            $('body').removeClass('lights-off');
        } else {
            $('body').addClass('lights-off');
            $("html, body").animate({scrollTop:$(".embed").offset().top-130});
        }
    });

    //Prender luces en el player
    $('.lgtbx').on('click', function() {
        $('body').removeClass('lights-off');
    });

    //click opciones
    $('.drop .m').on('click', function() {
        if ($('.drop .s').hasClass('active')) {
            $('.drop .s').removeClass('active');
            $('.bgtbx').removeClass('active');
        }else{
            $('.drop .s').addClass('active');
            $('.bgtbx').addClass('active');
        }
    });

    var j = $('.tabc>.tb.se .drop .s ul li:first').text();/* selecciono el primer texto */
    $('.tb .drop .m .txt').text(j);/* cambio de texto con el primer servidor */

    $('.tabm li').on('click', function() {
        var qz = $('.tb.se .drop .s ul li:first').text();
        $('.drop .m .txt').text(qz);
    });

    $('.drop .s ul li').on('click', function(e) {
        $('.drop .s').removeClass('active');
        $('.bgtbx').removeClass('active');
        var tx = $(this).text();
        $('.drop .m .txt').text(tx);
    });

    //bgtbx active
    $('.bgtbx').on('click', function() {
        $('.drop .s').removeClass('active');
        $('.bgtbx').removeClass('active');
    });

	$(document).on('keyup','header div input, #search .form input',function(){
		var e = $(this), v = e.val();
		if(v.length){
			if(!ismob()) if(!$('#box').length) $('main').append('<div id="box"><i class="ion-close-circled"></i><div class="inner"><h2>Resultados en películas</h2><div id="result" class="mov">');
			ajax({acc:'list',m:'search',s:v},function(d){
				$('#result').html(d);
				$('img').lazyload();
			});
		} else{
			if(!ismob()) $('#box').remove();
			else{ $('.ac-search').click(); return false; }
		} 
	});

$(document).on('click','#report button',function(){
	var e = $(this), m = $('#report-motive').val(), t = $('#report-text').val();
	if(!t.length){
		$('#report-text').css('border-color','red');
		alert('Explicanos el problema brevemente, gracias');
	} else{
	if(e.hasClass('ld')) return false;
	e.addClass('ld');
	ajax({acc:'box',mod:'reporte',i:$('.report div').data('i'),'m':m,'t':t},function(d){
		setTimeout(function(){
			alert(d);
			$('#box .outer > i').click();
		},1000);
	});
	}
	return false;
});

$(document).on('click','section .mr:not(.lnk)',function(){
	var e = $(this), p = e.attr('p');
	if(e.hasClass('ld')) return false;
	e.addClass('ld');
	ajax({acc:'list',m:e.attr('t'),s:e.attr('s')||'','p':p},function(d){
		setTimeout(function(){
		var o = $.parseJSON(d);
		e.prev().append(o.list);
		$('img').lazyload();
		if(!o.stop) e.remove();
		else e.attr('p',(Number(p)+1));
		e.removeClass('ld');
		},1000);
	});
	return false;
});

$(document).on('click','.tabm li',function(){
	var e = $(this);
	e.parents('ul').find('li').removeAttr('class');
	e.addClass('se');
	$('.tabc .tb').removeClass('se').eq(e.index()).addClass('se');
	$('.bg').removeClass('none');
	$('.ply').html('').removeClass('block');
	$('.tabc ul li').removeAttr('class');
}).on('click','.tabc ul li',function(){
	var e = $(this);
	e.parents('ul').find('li').removeAttr('class');
	e.addClass('se');
	$('.bg').addClass('none');
	$('.ply').html('<iframe src="'+e.attr('u')+'" scrolling="no" frameborder="0" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" oallowfullscreen="true" msallowfullscreen="true">').addClass('block');
}).on('click','.bg i',function(){
	$('.tabc .tb.se li:eq(0)').click();
});

$(document).on('click','.box',function(){
	var e = $(this), m = e.data('m'), i = e.data('i');
	$('body').append('<div id="box"><div class="outer"><i class="ion-close-circled"></i><div class="inner">');
	if(m == 't') $('#box .inner').append('<div class="vd"><iframe src="https://www.youtube.com/embed/'+i+'?rel=0&autoplay=1" frameborder="0" scrolling="no">');
	else if(m == 'r'){
		ajax({acc:'box',mod:'reporte'},function(d){
			$('#box .inner').html(d);
		});
	}
	setTimeout(function(){ $('#box .outer').addClass('open'); },0);
	return false;
}).on('click','#box .outer > i, #box > i',function(){
	$('#box').remove();
	return false;
});

$(document).on('click','aside .mr',function(){
	var e = $(this), g = $('.g'); g.toggleClass('act');
	if(g.hasClass('act')) e.text('Ver menos');
	else e.text('Ver más');
	return false;
});

$(document).on('click','header > i',function(){
	if($('#search').is(':visible')) closeSearch();
	$('body').removeAttr('style');
	var i = $(this); m = $('#menu');
	if(i.hasClass('ion-close-round')){		
		closeMenu(i,m);
	} else{
		i.attr('class','ion-close-round');
		m.fadeIn();
		$('body').css('overflow','hidden');
	}
	return false;
});

$(document).on('click','.ac-search',function(){
	if($('#menu').is(':visible')) closeMenu();
	$('body').removeAttr('style');
	var e = $(this); i = e.find('i'), s = $('#search');
	if(i.hasClass('ion-close-round')){
		closeSearch(i,s);
	} else{
		i.attr('class','ion-close-round');
		s.fadeIn();
		$('body').css('overflow','hidden');
	}
	return false;
});

function closeSearch(i,s){
	$('.ac-search > i').attr('class','ion-search');
	$('#search').fadeOut('fast',function(){ $('#result').html(''); $('#search .form input').val(''); });
}
function closeMenu(i,m){
	$('header > i').attr('class','ion-navicon-round');
	$('#menu').fadeOut();
}

if(ismob()){
	$('header').prepend('<i class="ion-navicon-round"></i><div id="menu"></div><div id="search"><div class="form"><i class="ion-search"></i></div><h3>Resultados en películas</h3><div id="result" class="mov">');
	$('#search .form').append($('header div input'));
	$('header div button').addClass('ac-search');
	$('#menu').append($('aside'));
	$('#menu aside').prepend($('header .m'));
}

});

function ismob(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function ajax(o,f){
	if(ajax_) ajax_.abort();
		ajax_ = $.post('./ajax.php',o).done(function(d){
		if(typeof(f) == 'function') f(d);
	});
}

$('img').lazyload();
