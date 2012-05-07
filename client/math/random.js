define(function(){
	return function(engine){
		/*
			engine.random() // 0 - 1 floats
			engine.random(10) // 0 - 9 integer
			engine.random(10, 30) // 10 - 30 integer
			engine.random([1, 10, 40]) // 1 or 10 or 40
		*/
		return function(max, min){
			var args = [].slice.call(arguments),
				r = Math.random();
			
			if(engine.is(max, 'array')){
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