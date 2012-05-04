define(function(){
	return function(rage){
		//	The sheet component converts a each frame of a sprite sheet into their own components.
		return function(map, components, sizeX, sizeY){
			var frameWidth = sizeX || rage.tile.sizeX,
				frameHeight = sizeY || rage.tile.sizeY;
			
			if(rage.is(components,'array')){
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
				
				rage.c(p)
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