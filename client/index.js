define([
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./media/index',
	'./storage/index',
	'./utilities/index',
	'./lib/index'
], function(engine, cycle, display, input, media, storage, utilities, lib){
	cycle(engine);
	display(engine);
	input(engine);
	media(engine);
	storage(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});