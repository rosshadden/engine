define(function(){
	'use strict';
	
	return function(x1, y1, x2, y2){
		var kx = x2 - x1,
			ky = y2 - y1;
		
		return Math.sqrt(kx * kx + ky * ky);
	};
});