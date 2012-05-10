define([
	'./lib/index',
	'./core/engine',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./math/index',
	'./media/index',
	'./network/index',
	'./pattern/index',
	'./save/index',
	'./utilities/index'
], function(lib, engine, cycle, display, input, math, media, network, pattern, save, utilities){
	'use strict';
	
	cycle(engine);
	display(engine);
	input(engine);
	math(engine);
	media(engine);
	network(engine);
	pattern(engine);
	save(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});