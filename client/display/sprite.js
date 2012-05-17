define(function(){
	'use strict';
	
	return function(Σ){
		/*
			The sprite object definess a drawable image for an entity.

			@usage
			var sprite = Σ.e('sprite player.png');

			//move to frame 3
			sprite.frame(3)

			//get current frame
			sprite.frame()

			//manually move to frame
			sprite.attr({frameX:	0, frameY:	1});

			//add animation
			sprite.comp('flicker')
			//add animation
			sprite.flicker('run', -1, 400, [0, 2, 3, 4])
			//play
			sprite.flicker('run')
		*/
		Σ.c('sprite')
		.requires('image bisect')
		.defaults({
			frameX:	0,
			frameY:	0,

			usePointsInsteadOfPixels: true
		})
		.defines({
			frame:	function(frame){
				if(Σ.is(frame)){
					if(Σ.is(frame, 'object')){
						this.frameX = frame.x;
						this.frameY = frame.y;
					}else{
						this.frameX = this.biToTileX(frame);
						this.frameY = this.biToTileY(frame);
					}
					
					return this;
				}
				
				return this.tileToBi(this.frameX, this.frameY);
			},
			
			draw:	function(c){
				c.drawImage(this._image, this.frameX * this.sizeX, this.frameY * this.sizeY, this.sizeX, this.sizeY, -this.regX, -this.regY, this.sizeX, this.sizeY);
				
				return this;
			},
			
			//implement for flicker
			flick:	function(frame){
				this.frame(frame);
			}
		});
	};
});