define(['./log', './scene', './sheet', './support', './polyfill'], function(log, scene, sheet, support, polyfill){
	return function(engine){
		scene(engine);
		polyfill(engine);
	
		return {
			log:	log,
			sheet:	sheet(engine),
			support:support
		};
	};
});
