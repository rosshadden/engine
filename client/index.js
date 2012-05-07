define([
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./utilities/index',
	'./lib/index'
], function(engine, cycle, display, input, utilities, lib){
	cycle(engine);
	display(engine);
	input(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});