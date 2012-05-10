define([
	'./log',
	'./scene',
	'./sheet',
	'./support',
	'./polyfill'
], function(log, scene, sheet, support, polyfill){
	'use strict';
	
	return function(engine){
		//	These just need to be run.
		polyfill(engine);
		
		//	These need to be mapped to engine.
		//	I like the responsibility being here,
		//	rather than inside the individual modules.
		engine.scene = scene(engine);
		
		//	These will be accessible under engine.utilities.
		return {
			log:	log,
			sheet:	sheet(engine),
			support:support
		};
	};
});
