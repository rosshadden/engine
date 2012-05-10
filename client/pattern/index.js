define([
	'./automap',
	'./flicker',
	'./pathfind',
	'./timestep'
], function(automap, flicker, pathfind, timestep){
	'use strict';
	
	return function(engine){
		automap(engine);
		flicker(engine);
		pathfind(engine);
		timestep(engine);
	};
});