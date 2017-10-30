var $body,
	windowHeight,
	windowWidth,
	$headerSelect,
	$menuTrigger,
	$servisesSlider,
	$gallerySlider,
	$btnPrev,
	$btnNext,
	$btnPrev2,
	$btnNext2,
	$reviewsTopSlider,
	$reviewsBottomSlider,
	mediaPoint1 = 1024,
	mediaPoint2 = 768,
	mediaPoint3 = 480,
	mediaPoint4 = 320;

$(document).ready(function ($) {
	$body = $('body');
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	$headerSelect = $('.language_list');
	$menuTrigger = $('.menuTrigger');
	$servisesSlider = $('.servises_slider');
	$gallerySlider = $('.gallery_grid_wrapper');
	$btnPrev = $('.servises_prev');
	$btnNext = $('.servises_next');
	$btnPrev2 = $('.gallery_prev');
	$btnNext2 = $('.gallery_next');
	$reviewsTopSlider = $('.reviews_top_slider');
	$reviewsBottomSlider = $('.reviews_bottom_slider');

	// mobile menu
	$menuTrigger.on('click', function () {
		if ($body.hasClass('menu_open')) {
			$body.removeClass('menu_open');
			$(this).removeClass('active_mod');
		} else {
			$body.addClass('menu_open');
			$(this).addClass('active_mod');
		}
	});

	// header language select
	$headerSelect.select2({
		minimumResultsForSearch: Infinity,
		dropdownParent: $('.select_language')
	});

	// servises slider
	$servisesSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: false,
		arrows: false,
		// autoplay: true,
		autoplaySpeed: 2000
	});

	$btnNext.click(function(){
		$servisesSlider.slick("slickNext");
	});

	$btnPrev.click(function(){
		$servisesSlider.slick("slickPrev");
	});

	$btnNext2.click(function(){
		$gallerySlider.slick("slickNext");
	});

	$btnPrev2.click(function(){
		$gallerySlider.slick("slickPrev");
	})

	// gallery slider
	$(function(){
		var $carousel = $('.gallery_grid_wrapper');
		function showSliderScreen($widthScreen) {
			//  console.log($widthScreen);

			if ($widthScreen <= "360") {
				if (!$carousel.hasClass('slick-initialized')) {
					$carousel.slick({
						infinite: true,
						slidesToShow: 1,
						slidesToScroll: 1,
						dots: false,
						arrows: false,
						//  autoplay: true,
						autoplaySpeed: 2000,
						adaptiveHeight: true
					});
				}

			} else {
				if ($carousel.hasClass('slick-initialized')) {
					$carousel.slick('unslick');
				}
			}
		}

		var widthScreen = $(window).width();
		$(window).ready(showSliderScreen(widthScreen)).resize(
			function () {
				var widthScreen = $(window).width();
				showSliderScreen(widthScreen);
			}
		);
	});


	$reviewsTopSlider.slick({
		infinite: true,
		// autoplay: true,
		autoplaySpeed: 3000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		// fade: true,
		dots: false,
		asNavFor: '.reviews_bottom_slider',
		prevArrow: "<span class='reviews_prev'></span>",
		nextArrow: "<span class='reviews_next'></span>"
	});
	$reviewsBottomSlider.slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		// fade: true,
		dots: false,
		asNavFor: '.reviews_top_slider',
		focusOnSelect: true
	});

	//developer funcitons
	pageWidget(['index']);
	getAllClasses('html','.elements_list');
});

$(window).on('load', function () {
	loadFunc();
});

$(window).on('resize', function () {
	resizeFunc();
});

$(window).on('scroll', function () {
	scrollFunc();
});

function loadFunc() {

}
function resizeFunc() {
	updateSizes();
}

function scrollFunc() {
	updateSizes();
	if($(this).scrollTop()>200){
		$('.header').addClass('scroll_mod');
	}
	else if ($(this).scrollTop()<200){
		$('.header').removeClass('scroll_mod');
	}
}

function updateSizes() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
}

if ('objectFit' in document.documentElement.style === false) {
	document.addEventListener('DOMContentLoaded', function () {
		Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
			(image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

			image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
		});
	});
}

//Functions for development
function getAllClasses(context, output) {
	var finalArray = [],
		mainArray = [],
		allElements = $(context).find($('*'));//get all elements of our page
	//If element has class push this class to mainArray
	for (var i = 0; i < allElements.length; i++) {
		var someElement = allElements[i],
			elementClass = someElement.className;
		if (elementClass.length > 0) {//if element have not empty class
			//If element have multiple classes - separate them
			var elementClassArray = elementClass.split(' '),
				classesAmount = elementClassArray.length;
			if (classesAmount === 1) {
				mainArray.push('.' + elementClassArray[0] + ' {');
			} else {
				var cascad = '.' + elementClassArray[0] + ' {';
				for (var j = 1; j < elementClassArray.length; j++) {
					cascad += ' &.' + elementClassArray[j] + ' { }';
				}
				mainArray.push(cascad);
			}
		}
	}

	//creating finalArray, that don't have repeating elements
	var noRepeatingArray = unique(mainArray);
	noRepeatingArray.forEach(function (item) {
		var has = false;
		var preWords = item.split('&');
		for (var i = 0; i < finalArray.length; ++i) {
			var newWords = finalArray[i].split('&');
			if (newWords[0] == preWords[0]) {
				has = true;
				for (var j = 0; j < preWords.length; ++j) {
					if (newWords.indexOf(preWords[j]) < 0) {
						newWords.push(preWords[j]);
					}
				}
				finalArray[i] = newWords.join('&');
			}
		}
		if (!has) {
			finalArray.push(item);
		}
	});
	for (var i = 0; i < finalArray.length; i++) {
		$('<div>' + finalArray[i] + ' }</div>').appendTo(output);
	}


	//function that delete repeating elements from arrays, for more information visit http://mathhelpplanet.com/static.php?p=javascript-algoritmy-obrabotki-massivov
	function unique(A) {
		var n = A.length, k = 0, B = [];
		for (var i = 0; i < n; i++) {
			var j = 0;
			while (j < k && B[j] !== A[i]) j++;
			if (j == k) B[k++] = A[i];
		}
		return B;
	}
}

function pageWidget(pages) {
	var widgetWrap = $('<div class="widget_wrap"><ul class="widget_list"></ul></div>');
	widgetWrap.prependTo("body");
	for (var i = 0; i < pages.length; i++) {
		$('<li class="widget_item"><a class="widget_link" href="' + pages[i] + '.html' + '">' + pages[i] + '</a></li>').appendTo('.widget_list');
	}
	var widgetStilization = $('<style>body {position:relative} .widget_wrap{position:absolute;top:0;left:0;z-index:9999;padding:10px 20px;background:#222;border-bottom-right-radius:10px;-webkit-transition:all .3s ease;transition:all .3s ease;-webkit-transform:translate(-100%,0);-ms-transform:translate(-100%,0);transform:translate(-100%,0)}.widget_wrap:after{content:" ";position:absolute;top:0;left:100%;width:24px;height:24px;background:#222 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAgMAAABinRfyAAAABGdBTUEAALGPC/xhBQAAAAxQTFRF////////AAAA////BQBkwgAAAAN0Uk5TxMMAjAd+zwAAACNJREFUCNdjqP///y/DfyBg+LVq1Xoo8W8/CkFYAmwA0Kg/AFcANT5fe7l4AAAAAElFTkSuQmCC) no-repeat 50% 50%;cursor:pointer}.widget_wrap:hover{-webkit-transform:translate(0,0);-ms-transform:translate(0,0);transform:translate(0,0)}.widget_item{padding:0 0 10px}.widget_link{color:#fff;text-decoration:none;font-size:15px;}.widget_link:hover{text-decoration:underline} </style>');
	widgetStilization.prependTo(".widget_wrap");
}
