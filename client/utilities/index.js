define(['./log', './scene', './polyfill'], function(log, scene, polyfill){
	return function(engine){
		scene(engine);
		polyfill(engine);
	
		return {
			log:	log
		};
	};
});
