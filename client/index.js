define([
	'./lib/index',
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./math/index',
	'./media/index',
	'./net/index',
	'./pattern/index',
	'./save/index',
	'./utilities/index'
], function(lib, engine, cycle, display, input, math, media, net, pattern, save, utilities){
	cycle(engine);
	display(engine);
	input(engine);
	math(engine);
	media(engine);
	net(engine);
	pattern(engine);
	save(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});