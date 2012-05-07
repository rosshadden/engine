define([
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./media/index',
	'./pattern/index',
	'./save/index',
	'./utilities/index',
	'./lib/index'
], function(engine, cycle, display, input, media, pattern, save, utilities, lib){
	cycle(engine);
	display(engine);
	input(engine);
	media(engine);
	pattern(engine);
	save(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});