define([
	'./log',
	'./scene',
	'./sheet',
	'./support',
	'./polyfill',
	'./promise'
], function(log, scene, sheet, support, polyfill, Promise){
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
			support:support,
			Promise:Promise,
        
			extend:	function(source, target){
				var object = {};

				for(var key in source){
					object[key] = source[key];
				}

				for(var key in target){
					object[key] = target[key];
				}

				object.parent = source;

				return object;
			}
		};
	};
});
