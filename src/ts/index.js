var Typed = require('typed.js');

// navbar change style on scroll
$(window).scroll(function() {
	if ($(document).scrollTop() > 50) {
		$('nav').addClass('nav-scroll');
	} else {
		$('nav').removeClass('nav-scroll');
	}
});

// animate scrolling menu - smooth scroll
$(document).ready(function() {
	$('a[href*=#]').bind('click', function(e) {
		e.preventDefault(); // prevent hard jump, the default behavior
		var target = $(this).attr("href"); // Set the target as variable
		// perform animated scrolling by getting top-position of target-element and set it as scroll target
		$('html, body').stop().animate({
			scrollTop: $(target).offset().top
		}, 600, function() {
			location.hash = target; //attach the hash (#jumptarget) to the pageurl
		});
		return false;
	});
});

// animate scrolling menu - follow user scrolling
$(window).scroll(function() {
	var scrollDistance = $(window).scrollTop();

	// Assign active class to nav links while scolling
	$('.page-section').each(function(i) {
		if ($(this).position().top <= scrollDistance) {
			$('.navigation a.active').removeClass('active');
			$('.navigation a').eq(i).addClass('active');
		}
	});
}).scroll();


// typed effect on spanner 1
$('#typed').ready(function(){
	var typed = new Typed('#typed', {
		stringsElement: '#typed-strings',
		// NOTE: lower is higher
		typeSpeed: 60,
		backSpeed: 10,
		//startDelay: 1000,
		loop: true
	});
});


// animate counter on spanner 3
$(function($, win) {
	$.fn.inViewport = function(cb) {
		return this.each(function(i,el){
			function visPx(){
				var H = $(this).height(),
				r = el.getBoundingClientRect(), t=r.top, b=r.bottom;
				return cb.call(el, Math.max(0, t>0? H-t : (b<H?b:H)));  
			} visPx();
			$(win).on("resize scroll", visPx);
		});
	};
}(jQuery, window));

jQuery(function($) { // DOM ready and $ in scope
	$(".stats-counter").inViewport(function(px) { // Make use of the `px` argument!!!
		// if element entered V.port ( px>0 ) and
		// if prop initNumAnim flag is not yet set
		// = Animate numbers
		if(px>0 && !this.initNumAnim) { 
			this.initNumAnim = true; // Set flag to true to prevent re-running the same animation
			$(this).prop('Counter',0).animate({
				Counter: $(this).text()
			}, {
			duration: 2000,
			step: function (now) {
					$(this).text(Math.ceil(now));
				}
			});
		}
	});
});