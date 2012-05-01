define(['./log', './scene', './sheet', './support', './polyfill'], function(log, scene, sheet, support, polyfill){
	return function(engine){
		scene(engine);
		sheet(engine);
		support(engine);
		polyfill(engine);
	
		return {
			log:	log
		};
	};
});
