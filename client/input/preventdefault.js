define(function(){
	'use strict';
	
	return function(Σ){
		//	The PreventDefault method prevents defaults for input events.
		Σ.preventDefault = function(pres){
			if(Σ.is(pres, 'string')){
				pres = pres.split(' ');
			}

			for(var i in pres){
				Σ.preventDefault.d[pres[i]] = 1;
			}
		};
		
		Σ.preventDefault.d = {};
	};
});