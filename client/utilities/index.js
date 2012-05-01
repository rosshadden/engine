define(['./log', './scene'], function(log, scene){
	return function(engine){
		scene(engine);
	
		return {
			log:	log
		};
	};
});
