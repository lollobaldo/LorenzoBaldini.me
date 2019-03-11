// import Typed from typed.js

var Typed = require('typed.js');
//var Count = require('countup.js');

$('#typed').ready(function(){
	var typed = new Typed('#typed', {
		stringsElement: '#typed-strings',
		// NOTE: lower is higher
		typeSpeed: 60,
		backSpeed: 10,
		startDelay: 1000,
		loop: true
	});
});

$(window).scroll(function() {
	if ($(document).scrollTop() > 50) {
		$('nav').addClass('nav-scroll');
	} else {
		$('nav').removeClass('nav-scroll');
	}
});

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