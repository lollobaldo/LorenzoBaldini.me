//import Typed from typed.js

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