define(function(){
	'use strict';
	
	return function(engine){
		//	The sheet component converts a each frame of a sprite sheet into their own components.
		return function(map, components, sizeX, sizeY){
			var frameWidth = sizeX || engine.tile.sizeX,
				frameHeight = sizeY || engine.tile.sizeY;
			
			if(engine.is(components,'array')){
				components = components.join(' ');
			}
				
			//	create new sprites for sheet
				
			//	save frame positions from map
			var x, y,
				b = [];
			for(var p in map){
				x = map[p][0] || 0;
				y = map[p][1] || 0;
				b.push(p);
				
				engine.c(p)
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