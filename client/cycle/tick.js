define(function(){
	return function(engine){
		/*
			The tick component is a stop watch cyclier. It will return the milliseconds in time
			between tick() calls.

			var tick = engine.e('tick');
			//wait 200 milliseconds
			tick.tick(); //200
			//wait 10 milliseconds
			tick.tick(); //10
		*/
		engine.c('tick')
		.init(function(){
			this.lastTime = Date.now();
		})
		.defines({
			tick:	function(){
				var wall = Date.now(),
					last = this.lastTime;
				
				this.lastTime = wall;
			
				return wall - last;
			}
		});
	};
});