define(function(){
	'use strict';
	
	return function(engine){
		//	The PreventDefault method prevents defaults for input events.
		engine.preventDefault = function(pres){
			if(engine.is(pres, 'string')){
				pres = pres.split(' ');
			}

			for(var i in pres){
				engine.preventDefault.d[pres[i]] = 1;
			}
		};
		
		engine.preventDefault.d = {};
	};
});