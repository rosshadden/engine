define([
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./media/index',
	'./utilities/index',
	'./lib/index'
], function(engine, cycle, display, input, media, utilities, lib){
	cycle(engine);
	display(engine);
	input(engine);
	media(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});