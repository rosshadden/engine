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
	'use strict';
	
	return function(Σ){
		bisect(Σ);
		body(Σ);
		Σ.distance = distance;
		drag(Σ);
		Σ.force = force(Σ);
		hit(Σ);
		hitmap(Σ);
		iso(Σ);
		limit(Σ);
		point(Σ);
		Σ.random = random(Σ);
		Σ.range = range;
		Σ.tile = tile(Σ);
	};
});