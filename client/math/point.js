define(function(){
	return function(engine){
		/*
			The point component definess an entity that has a 2d position in space.
			This can be used for 2d calculations or most commonly 2d sprite positioning.
		*/
		engine.c('point')
		.defaults({
			posX:	0,
			posY:	0
		})
		.defines({
			pos:	function(x, y){
				if(engine.is(x, 'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				
				this.posX = x;
				this.posY = y;
				
				return this;
			},
			
			distance:	function(x, y){
				if(engine.is(x, 'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				return engine.distance(this.posX, this.posY, x, y);
			}
		});
	};
});