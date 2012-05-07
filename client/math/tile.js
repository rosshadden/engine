define(function(){
	return function(engine){
		/*
			The tile component adds tile positioning functions and helper functions for tile based games.

			@usage

			//set tile size
			engine.tile.sizeX = 40;
			engine.tile.sizeY = 40;

			//convert mouse coordinates to a tile position..
			var mouse = {x:10, y:234};

			engine.tile.toX(mouse.x) // 0
			engine.tile.toY(mouse.y) 

			//create tile
			var tile = engine.e('tile sprite tiles.png')
			.tile(2, 4);

			tile.posX // 2 * engine.tile.sizeX == 80
			tile.posY // 4 * engine.tile.sizeY == 160

			//create a bunch of tiles from a map

			var map = 
			[
			[1,2,4,5,0,3,4,5,6,7],
			[1,2,4,5,0,3,4,5,6,7],
			[1,2,4,5,0,3,4,5,6,7],
			[1,2,4,5,0,3,4,5,6,7]
			];

			engine.e('tile sprite tiles.png', map.length * map[0].length)
			.tilemap(map.length[0].length,function(x, y){
			  this.tile(x, y);
			  this.frame(map[y][x]);
			});

			@warning moving to negative tiles will cause rounding issues.
			Its recommended you avoid negative tile values

			TODO: remove size vars from entity. Use global size instead
		*/
		return engine.c('tile')
		.statics({
			sizeX:	40,
			sizeY:	40,
			
			toPosX:	function(x){
				return this.toTileX(x) * this.sizeX;
			},
			
			toPosY:	function(y){
				return this.toTileY(y) * this.sizeY;
			},
			
			toPos:	function(x, y){
				if(engine.is(x, 'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				
				return {
					posX:	this.toPosX(x),
					posY:	this.toPosY(y)
				};
			},
			
			//converts the given coordinate to a tile position
			toTileX:	function(x){
				return (x - this.sizeX * 0.5) / this.sizeX + 0.5 | 0
			},
			
			toTileY:	function(y){
				return (y - this.sizeY * 0.5) / this.sizeY + 0.5 | 0
			},
			
			toTile:	function(x, y){
				if(engine.is(x, 'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				
				return {
					tileX:	this.toTileX(x),
					tileY:	this.toTileY(y)
				};
			}
		})
		.defaults({
			posX:	0,
			posY:	0,
			regX:	0,
			regY:	0
		})
		.defines({
			tile:	function(x, y){
				if(engine.is(x, 'object')){
					//will mess up if regX is not top right corner
					y = x.y || engine.tile.toTileY(x.posY);
					x = x.x || engine.tile.toTileX(x.posX);
				}
				
				this.tileX(x);
				this.tileY(y);
				
				return this;
			},
			
			tileX:	function(v){
				if(engine.is(v)){
					this.posX = v * this.sizeX + 0.5 | 0;
					return this;
				}
				
				return this.posX / this.sizeX + 0.5 | 0;
			},
			
			tileY:	function(v){
				if(engine.is(v)){
					this.posY = v * this.sizeY + 0.5 | 0;
					return this;
				}
				
				return this.posY / this.sizeY + 0.5 | 0;
			}
		})
		.init(function(){
			this.sizeX = engine.tile.sizeX;
			this.sizeY = engine.tile.sizeY;
		});
	};
});