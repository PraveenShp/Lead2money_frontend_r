/* Template: Pora - Insurance Agency HTML Landing Page Template*/
(function ($) {
	"use strict";

//AOS Animatjon
	AOS.init({	
		offset: 0, // offset (in px) from the original trigger point
		delay: 0, // values from 0 to 3000, with step 50ms
		duration: 900, // values from 0 to 3000, with step 50ms
		easing: 'ease-in-out', // default easing for AOS animations
		once: false, // whether animation should happen only once - while scrolling down
		mirror: false, // whether elements should animate out while scrolling past them
		anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
	  
	  });

//Owl-Carousel - Home 3 review
// $(window).on("load", function () {
// 	$('.reviews-block').owlCarousel({
// 		items: 1,
// 		nav: false,
// 		dots: false,		 
// 		autoplay: true,
// 		loop: true,      
// 		margin: 30,
// 		autoplayTimeout: 3500,
// 		autoplayHoverPause: true,
// 		autoHeight: true,
// 		smartSpeed: 2000,  
	    
// 	});
//   });



		
	//Sticky Header 
	function updateScroll() {
		if ($(window).scrollTop() >= 80) {
			$(".navbar").addclass('sticky');
		} else {
			$(".navbar").removeclass("sticky");
		}
	}
	$(function () {
		$(window).scroll(updateScroll);
		updateScroll();
	});


//NAVBAR Scroll		
		// var aScroll = $('.nav-item .nav-link'),
		// $navbarCollapse = $('.navbar-collapse');
		// aScroll.on('click', function (event) {
		// 	var target = $($(this).attr('href'));
		// 	$(this).parent(".nav-item").siblings().removeclass('active');
		// 	$(this).parent('.nav-item').addclass('active');
	
		// 	if (target.length > 0) {
		// 		event.preventDefault();
		// 		$('html, body').animate({
		// 			scrollTop: target.offset().top - 70
		// 		}, 1000);
		// 	}
		// 		// If click link and navabr is show
		// 		if ($('.navbar-collapse').hasclass('show')) {
		// 			$('.navbar-collapse').toggleclass('show');
		// 			$('.navbar-toggler-icon').toggleclass('active');
		// 			$('.navbar-toggler').toggleclass('collapsed');
		// 		}
		// 	});
			

  // Background Image
  $("[data-background]").each(function () {
  	$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
  })


})(jQuery);