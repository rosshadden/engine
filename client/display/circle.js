define(function(){
	return function(engine){
		//	The circle component draws a rectangle on screen.
		engine.c('circle')
		.requires('draw')
		.defaults({
			color:	'#82d5f4'
		})
		.defines({
			draw:	function(c){
				c.fillStyle = this.color;
				
				c.beginPath();
					var r = this.radius();
					
					c.arc(-this.regX + r , -this.regY + r , r, 0, Math.PI*2, true);
				
				c.closePath();
				
				c.fill();
				
				return this;
			},
			
			radius:	function(r){
				if(engine.is(r)){
					this.sizeX = this.sizeY = r * 2;
					return this;
				}
				
				return this.sizeX * 0.5;
			}
		});
	};
});