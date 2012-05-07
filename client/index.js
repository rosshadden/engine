define([
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./media/index',
	'./save/index',
	'./utilities/index',
	'./lib/index'
], function(engine, cycle, display, input, media, save, utilities, lib){
	cycle(engine);
	display(engine);
	input(engine);
	media(engine);
	save(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});