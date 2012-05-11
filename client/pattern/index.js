define([
	'./automap',
	'./flicker',
	'./pathfind',
	'./timestep'
], function(automap, flicker, pathfind, timestep){
	'use strict';
	
	return function(Σ){
		automap(Σ);
		flicker(Σ);
		pathfind(Σ);
		timestep(Σ);
	};
});