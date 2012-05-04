define(['./log', './scene', './sheet', './support', './polyfill'], function(log, scene, sheet, support, polyfill){
	return function(rage){
		//	These just need to be run.
		polyfill(rage);
		
		//	These need to be mapped to rage.
		//	I like the responsibility being here,
		//	rather than inside the individual modules.
		rage.scene = scene(rage);
		
		//	These will be accessible under rage.utilities.
		return {
			log:	log,
			sheet:	sheet(rage),
			support:support
		};
	};
});
