define([
	'./lib/index',
	'./core/engine',
	'./collision/index',
	'./cycle/index',
	'./display/index',
	'./input/index',
	'./math/index',
	'./media/index',
	'./network/index',
	'./pattern/index',
	'./save/index',
	'./utilities/index'
], function(lib, Σ, collision, cycle, display, input, math, media, network, pattern, save, utilities){
	'use strict';

	Σ.collision = collision;
	cycle(Σ);
	display(Σ);
	input(Σ);
	math(Σ);
	media(Σ);
	network(Σ);
	pattern(Σ);
	save(Σ);
	Σ.utilities = utilities(Σ);
	
	return Σ;
});
