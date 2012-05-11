define([
	'./drawlist',
	'./tick',
	'./tween',
	'./update',
	'./wait'
], function(drawlist, tick, tween, update, wait){
	'use strict';
	
	return function(Σ){
		drawlist(Σ);
		tick(Σ);
		tween(Σ);
		update(Σ);
		wait(Σ);
	};
});