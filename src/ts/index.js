var Typed = require('typed.js');
var Navbar = require('./imports/navbar')
var Counters = require('./imports/counters')

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