define([
	'./automap',
	'./flicker',
	'./pathfind',
	'./timestep'
], function(automap, flicker, pathfind, timestep){
	return function(engine){
		automap(engine);
		flicker(engine);
		pathfind(engine);
		timestep(engine);
	};
});