define([
	'./keyboard',
	'./mouse',
	'./pressed',
	'./preventdefault'
], function(keyboard, mouse, pressed, preventdefault){
	'use strict';
	
	return function(Σ){
		keyboard(Σ);
		mouse(Σ);
		pressed(Σ);
		preventdefault(Σ);
	};
});