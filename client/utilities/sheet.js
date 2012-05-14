define(function(){
	'use strict';
	
	return function(Σ){
		//	The sheet component converts a each frame of a sprite sheet into their own components.
		return function(map, components, sizeX, sizeY){
			var frameWidth = sizeX || Σ.tile.sizeX,
				frameHeight = sizeY || Σ.tile.sizeY;
			
			if(Σ.is(components,'array')){
				components = components.join(' ');
			}
				
			//	create new sprites for sheet
				
			//	save frame positions from map
			var x, y,
				b = [];
			for(var p in map){
				x = map[p].frameX || 0;
				y = map[p].frameY || 0;
				b.push(p);
				
				Σ.c(p)
				.requires('sprite ' + components)
				.defines({
					frameX:	x,
					frameY:	y,
					sizeX:	frameWidth,
					sizeY:	frameHeight
				});
			}
			
			return b;
		};
	};
});