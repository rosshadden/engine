define(function(){
	'use strict';
	
	return function(Σ){
		/*
			Σ.random() // 0 - 1 floats
			Σ.random(10) // 0 - 9 integer
			Σ.random(10, 30) // 10 - 30 integer
			Σ.random([1, 10, 40]) // 1 or 10 or 40
		*/
		return function(max, min){
			var args = [].slice.call(arguments),
				r = Math.random();
			
			if(Σ.is(max, 'array')){
				return max[r * max.length | 0];
			}
			
			switch(args.length){
				case 0:
					return r;
				case 1:
					return r * max | 0;
				case 2:
					return r * (max - min + 1) + min | 0;
			}
		};
	};
});