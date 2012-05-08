define([
	'./lib/index',
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./math/index',
	'./media/index',
	'./pattern/index',
	'./save/index',
	'./utilities/index'
], function(lib, engine, cycle, display, input, math, media, pattern, save, utilities){
	cycle(engine);
	display(engine);
	input(engine);
	math(engine);
	media(engine);
	pattern(engine);
	save(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});