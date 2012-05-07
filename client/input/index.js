define([
	'./keyboard',
	'./mouse',
	'./pressed',
	'./preventdefault'
], function(keyboard, mouse, pressed, preventdefault){
	return function(engine){
		keyboard(engine);
		mouse(engine);
		pressed(engine);
		preventdefault(engine);
	};
});