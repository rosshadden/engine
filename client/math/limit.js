define(function(){
	'use strict';
	
	return function(engine){
		/*
			The limit component constraints a value inside a range.

			This can be useful for maps, characters, enemies, boxes etc..

			engine.e('limit bitmap char.png')
			.limit('posX', 0, 10) //limits to 0-10
			.limit('health', 0) //minimum 0

			//maybe in the future..
			//.limit('name', 'ben', 'roger', 'bob') //limits name to one of these
			//.limit('name', ['yep', 'beb'])
			//.limit('type, [0, 10, 13])
		*/
		engine.c('limit')
		.defines('limit', function(prop){
			var c = arguments;
			
			//if(engine.is(min, 'array')) c = min;
			//if(engine.is(c[1], 'number')){
				if(this[prop] < c[1]){
					this[prop] = c[1];
				}else if(engine.is(c[2]) && this[prop] > c[2]){
					this[prop] = c[2];
				}
			/*} else {
				for(var i=1; i<c.length; i++){
					if(this[prop] == c[i]) return this;
				}
				this[prop] = c[1];
			}*/
			
			return this;
		});
	};
});