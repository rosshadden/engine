define(['engine/draw'], function(draw){
    var	_numEntities = 0,
		entities = {},
		
	cell = {
		width:	25,
		height:	25
	},
	
	//	Possibly consider breaking this out into its own module,
	//	and probably still referring to it here:  maps = require('maps');
	maps = (function(){
		//	Cache of the maps loaded so far.
		var maps = {},
			current,
			
		//	Maybe these should call the relevant parent functions as needed.
		//	So if setCurrent() doesn't find the map in the cache, it can
		//		call fetch, etc.
		getCurrent = function(){
			return current;
		},
		
		setCurrent = function(mapPath){
			current = mapPath;
		},
		
		//	Totally make this a chainable API.
		fetch = function(mapPath){
			var def = new $.Deferred;
			
			$.getJSON('/maps/' + mapPath, function(map){
				maps[mapPath] = map;
				def.resolve(mapPath);
			});
			
			return def.promise();
		},
	
		get = function(mapPath){
			return maps[mapPath];
		},
		
		render = function(mapPath){
			var def = new $.Deferred,
				map = maps[mapPath],
				
				isLoaded = (function(){
					var list = [];
					return function(which){
						list.push(which);
						
						if(list.length === map.tiles.length){
							def.resolve();
						}
					};
				})();
			
			if(!map.element){
				map.element = document.createElement('canvas');
				map.element.width = toXY(map.properties.dimensions.width);
				map.element.height = toXY(map.properties.dimensions.height);
			}
			
			if(!map.ctx){
				map.ctx = map.element.getContext('2d');
			}
			
			map.tiles.forEach(function(tile, t){
				var sprite = new Image();
				
				sprite.src = 'img/tiles/' + tile.src;
				sprite.onload = function(){
					draw.image({
						src:	sprite,
						source: tile.source,
						destination: {
							position:	toXY(tile.destination.position),
							dimensions:	tile.destination.dimensions
						}
					}, map.ctx);
					isLoaded(t);
				};
			});
			
			if(map.tiles.length === 0){
				def.resolve();
			}
			
			return def.promise();
		},
		
		//	'change' is a weird word for this, because it loads too,
		//		but these verbs are all very similar... MUST FIX!
		//	UPDATE:	renamed 'change' -> 'load', but verbs are still similar.
		load = function(mapPath){
			var def = new $.Deferred;
			
			$.when(fetch(mapPath))
			//	There HAS to be a more clean way to chain these deferreds.
			//	$.Deferred.pipe comes close, but not quite.
			//	Chaining $.Deferred.done's would work,
			//		except maps.fetch would have to return currentMap?
			.done(function(){
				//	render() is async because of Image.onload.
				$.when(render(mapPath))
				.done(function(){
					setCurrent(mapPath);
					
					def.resolve();
				});
			});
			
			return def.promise();
		},
		
		show = function(mapPath){
			$('#engine-cache')[0].appendChild(maps[mapPath].element);
		};
		
		return {
			getCurrent:	getCurrent,
			setCurrent:	setCurrent,
			fetch:		fetch,
			get:		get,
			render:		render,
			load:		load,
			show:		show
		};
	})(),
	
	createEntity = function(type, properties){
		_numEntities++;
		entities[properties.name] = new type(properties);
	},
	
	toGrid = function(x, y){
		if(typeof y === 'undefined'){
			if(typeof x === 'object'){
				y = x.y || x.top || null;
				x = x.x || x.left || null;
			}else{
				return Math.floor(x / cell.width);
			}
		}
		return {
			x:	Math.floor(x / cell.width),
			y:	Math.floor(y / cell.height)
		};
	},
	
	toXY = function(x, y){
		if(typeof y === 'undefined'){
			if(typeof x === 'object'){
				if(x.x && x.y){
					y = x.y;
					x = x.x;
				}else if(x.width && x.height){
					return {
						width:	x.width * cell.width,
						height:	x.height * cell.height
					};
				}
			}else{
				return x * cell.width;
			}
		}
		
		return {
			x:	x * cell.width,
			y:	y * cell.height
		};
	};
	
	return {
        entities:		entities,
		cell:			cell,
		maps:			maps,
		createEntity:	createEntity,
		toGrid:			toGrid,
		toXY:			toXY
	};
});
