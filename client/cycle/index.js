define([
	'./drawlist',
	'./tick',
	'./tween',
	'./update',
	'./wait'
], function(drawlist, tick, tween, update, wait){
	'use strict';
	
	return function(engine){
		drawlist(engine);
		tick(engine);
		tween(engine);
		update(engine);
		wait(engine);
	};
});