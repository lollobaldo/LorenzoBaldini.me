module.exports = {
	main: function() {
		change();
		jump();
		scroll();
	},

	// navbar change style on scroll
	change: $(window).scroll(function() {
		if ($(document).scrollTop() > 50) {
			$('nav').addClass('nav-scroll');
		} else {
			$('nav').removeClass('nav-scroll');
		}
	}),

	// animate scrolling menu - smooth scroll
	jump: $(document).ready(function() {
		$('a[href*=\\#]').bind('click', function(e) {
			var navHeight = $('nav').outerHeight() + 20;
			e.preventDefault(); // prevent hard jump, the default behavior
			var target = $(this).attr("href"); // Set the target as variable
			// perform animated scrolling by getting top-position of target-element and set it as scroll target
			$('html, body').stop().animate({
				scrollTop: $(target).offset().top - navHeight
			}, 600, function() {
				var pos = $(window).scrollTop();
				location.hash = target; //attach the hash (#jumptarget) to the pageurl
				$(window).scrollTop(pos);
			});
			return false;
		});
	}),

	// animate scrolling menu - follow user scrolling
	scroll: $(window).scroll(function() {
		var scrollDistance = $(window).scrollTop();
		var navHeight = $('nav').outerHeight();

		// Assign active class to nav links while scolling
		$('.page-section').each(function(i) {
			if ($(this).position().top - navHeight <= scrollDistance) {
				$('nav a.active').removeClass('active');
				$('nav a').eq(i).addClass('active');
			}
		});
	}).scroll(),
}