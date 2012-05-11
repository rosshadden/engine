define([
	'./log',
	'./scene',
	'./sheet',
	'./support',
	'./polyfill'
], function(log, scene, sheet, support, polyfill){
	'use strict';
	
	return function(Σ){
		//	These just need to be run.
		polyfill(Σ);
		
		//	These need to be mapped to Σ.
		//	I like the responsibility being here,
		//	rather than inside the individual modules.
		Σ.scene = scene(Σ);
		
		//	These will be accessible under Σ.utilities.
		return {
			log:	log,
			sheet:	sheet(Σ),
			support:support
		};
	};
});
