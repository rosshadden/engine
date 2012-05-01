define(['./log', './scene', './support', './polyfill'], function(log, scene, support, polyfill){
	return function(engine){
		scene(engine);
		support(engine);
		polyfill(engine);
	
		return {
			log:	log
		};
	};
});
