define([
	'./bisect',
	'./body',
	'./distance',
	'./drag',
	'./force',
	'./hit',
	'./hitmap',
	'./iso',
	'./limit',
	'./point',
	'./random',
	'./range',
	'./tile'
], function(bisect, body, distance, drag, force, hit, hitmap, iso, limit, point, random, range, tile){
	return function(engine){
		bisect(engine);
		body(engine);
		engine.distance = distance;
		drag(engine);
		engine.force = force(engine);
		hit(engine);
		hitmap(engine);
		iso(engine);
		limit(engine);
		point(engine);
		engine.random = random(engine);
		engine.range = range;
		engine.tile = tile(engine);
	};
});