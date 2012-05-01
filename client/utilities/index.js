define(['./log', './scene', './sheet', './support', './polyfill'], function(log, scene, sheet, support, polyfill){
	return function(engine){
		polyfill(engine);
		
		engine.scene = scene(engine);
	
		return {
			log:	log,
			sheet:	sheet(engine),
			support:support
		};
	};
});
