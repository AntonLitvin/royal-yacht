$(window).on('load', function() { 
	$('.loader-inner').fadeOut(); 
	$('.loader').delay(400).fadeOut('slow');
	var videocontent = '<video autoplay muted loop id="myVideo"><source src="video/comp-1_2.mp4" type="video/mp4"></video>';
	if($(window).width() > '767') {
		$('.video-wrapper').append(videocontent);
	}
});

$(function() {

function submitForm(selector, callback) {
	$(selector).on('submit', function(e) {
		var $this = $(this);
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: $this.attr('action'),
			dataType : "html",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			data: $this.serialize()
		}).done(function() {
			callback();
		}).fail(function(){
			callback();
		}).always(function(){
			callback();
		});
	});
}

function success() {

	setTimeout(function() {
		$('.loader-contact').fadeIn(200);
		setTimeout(function() {
			$('.contact-reply').fadeIn(300);
			setTimeout(function() {
				$('.loader-contact').fadeOut(200);
				$('.site-contact-form').trigger('reset');
				$('.contact-reply').fadeOut(300);
			}, 3000);
		}, 2000);
	}, 500);

}

function success2() {

	setTimeout(function() {
		$('.loader-modal').fadeIn(200);
		setTimeout(function() {
			$('.modal-reply').fadeIn(300);
			setTimeout(function() {
				$('.loader-modal').fadeOut(200);
				$('.modal-contact-form').trigger('reset');
				$('.modal-reply').fadeOut(300);
				$('.modal').fadeOut(300);
				$('.overlay').fadeOut(300);
			}, 3000);
		}, 2000);
	}, 500);

}

	submitForm('.site-contact-form', success);
	submitForm('.modal-contact-form', success2);

//toggle menu
$('.toggle-btn').on('click', function() {
	$(this).toggleClass('on');
	$('.main-menu').slideToggle();
	return false;
});

$(window).resize(function(){
	if($(window).width() > '991') {
		$('.main-menu').removeAttr('style');
		$('.toggle-btn').removeClass('on');
	}
});


// Scroll to block
$('.main-menu > li > a').on('click', function () {

	var headerHeight = 70;
	var elementClick = $(this).attr('href');
	var destination = $(elementClick).offset().top - headerHeight;

	if ($(elementClick).length != 0) { // проверка существования элемента
		if($(window).width() < '992')   {
			$('.main-menu').slideToggle();
			$('.toggle-btn').removeClass('on');
		}
		$('html, body').animate({ scrollTop: destination }, 800);
	}
	return false; 
});


/*To top button*/
$('.page-logo').on('click', function() {
	$('body, html').animate({ scrollTop:0 },800);
	if($(window).width() < '768') {
		$('.main-menu').slideUp();
		$('.toggle-btn').removeClass('on');
	}
	return false;
});


/*Modal*/
$('.modal-open').on('click', function(e){
	e.preventDefault();
	closeModal();
	$('.modal').fadeIn();
	$('.overlay').fadeIn();
});


$('.modal-close').on('click', function(e){
	e.preventDefault();
	$('.modal').fadeOut();
	$('.overlay').fadeOut();
});

$('.overlay').on('click', function(e){
	e.preventDefault();
	$('.modal').fadeOut();
	$(this).fadeOut();
});


//Offer popup
function openModal($modal) {
	$modal = '#' + $modal;
	var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
	$('.page-header').css('right', scrollBarWidth);
	$('body').css('padding-right', scrollBarWidth).addClass('modal-open');
	$($modal).addClass('active').find('.modal-inner').addClass('active');
}

function closeModal($modal) {
	$modal = '#' + $modal;
	$('.page-header').css('right', '0');
	$($modal + ',.offer-popup-overlay').scrollTop(0).removeClass('active').find('.modal-inner').removeClass('active');
	$('body').css('padding-right', '').removeClass('modal-open');
}

//Clicking outside the inner modal content should close it.
$('.offer-popup-overlay').on('click', function () {
	var $target = $(this).attr('id');
	closeModal($target);
}).find('.modal-inner').on('click', function (e) {
	e.stopPropagation();
});

$('.offer-item').on('click', function (e) {
	e.preventDefault();
	var $target = $(this).attr('data-target');
	openModal($target);
});

$('.offer-close').on('click', function(e){
	e.preventDefault();
	var $target = $(this).parents('.offer-popup-overlay').attr('id');
	closeModal($target);
});


//See more
$('#js-see-more').on('click', function(){
	if($(this).hasClass('open')) {
		$(this).removeClass('open');
		$('.see-more').html('See more');
		$('.offer-hide').slideUp();
	} else {
		$(this).addClass('open');
		$('.see-more').html('See less');
		$('.offer-hide').slideDown();
	}
});


//Gallery
$('.zoom-gallery').magnificPopup({
	delegate: 'a',
	type: 'image',
	closeOnContentClick: false,
	closeBtnInside: true,
	mainClass: 'mfp-with-zoom mfp-img-mobile',
	image: {
		verticalFit: true,
	},
	gallery: {
		enabled: true,
		navigateByImgClick: true,
		arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>', // markup of an arrow button
		tPrev: 'Previous (Left arrow key)', // title for left button
		tNext: 'Next (Right arrow key)', // title for right button
		tCounter: '<span class="mfp-counter">%curr% of %total%</span>' // markup of counter
	},
	zoom: {
		enabled: true,
		duration: 300, // don't foget to change the duration also in CSS
		opener: function(element) {
			return element.find('img');
		}
	}
	
});


//Swiper slider

var mySwiperOffer = new Swiper ('.gallery-exclusive', {

	loop: true,
	// autoplay: {
	// 	delay: 6000,
	// },
	autoplay: false,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	autoHeight: true,
	slidesPerView: 1,
	spaceBetween: 0
});


//Stop slider autoplay on hover
$('.gallery-exclusive').hover( function(){
	//mySwiperOffer.autoplay.stop();
}, function(){
	//mySwiperOffer.autoplay.start();
});



// Zoom picture plugin
// http://www.jacklmoore.com/zoom/
$('.map1-wrapper').zoom({
	url: 'img/map.jpg',
	//on: 'grab'
});

$('.map2-wrapper').zoom({
	url: 'img/map-mobile.jpg',
	//on: 'grab'
});


//Tabs gallery
$('.simple-gallery').each(function(){
	$(this).find('.tab-item').not(':first').hide();
	$(this).find('.tab:first').addClass('active');
});

$('.simple-gallery .tab').on('click', function() {
	$(this).parents('.simple-gallery').find('.tab').removeClass('active').eq($(this).index()).addClass('active');
	$(this).parents('.simple-gallery').find('.tab-item').hide().eq($(this).index()).fadeIn();
}).eq(0).addClass('active');


$('.popup-see-descr').on('click', function(){
	$(this).toggleClass('open');
	$(this).next('.popup-descr').stop(true, true).slideToggle(300);
});



});