define(function(){
	'use strict';
	
	return function(Σ){
		//	The rect component draws a rectangle on screen.
		Σ.c('rect')
		.requires('draw')
		.defaults({
			color:	'#82d5f4'
		})
		.defines({
			draw:	function(c){
				c.fillStyle = this.color;

				c.fillRect(-this.regX, -this.regY, this.sizeX, this.sizeY);
				
				return this;
			}
		});
	};
});