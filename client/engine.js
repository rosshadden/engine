define(['engine/world', 'engine/draw', 'engine/utilities'], function(world, draw, utilities){
	var Engine = function(options){
		var self = this,
	    
        //  Need to pass this to the drawing library.
		screen = options.screen || $('canvas')[0],
		
		execute = function(what){
			if(typeof options[what] === 'function'){
				options[what].call(self);
			}
		},
		
		init = (function(){
			//	main.js needs to be able to configure these.
			//	I think I should make each module take initialization variables
			//		before becoming modules.
			//world.maps.setCurrent('map1');
			draw.setDimensions(600, 400, world.cell);
			
			if($('#engine-cache').length === 0){
				$('<div>',{
					id:	'engine-cache'
				}).appendTo('body');
			}
			
			execute('init');
		})(),
		
		update = function(){
			execute('update');
		},
		
		paint = function(){
			var map = world.maps.get(world.maps.getCurrent());
			
			draw.backdrop(draw.getDimensions().width, draw.getDimensions().height);
			
			draw.cells();
			
			draw.layer(map.element, world.toXY(map.properties.dimensions));
            
			for(var entity in world.entities){
				world.entities[entity].draw();
			}
			
			execute('paint');
		},
		
		main = function(){
			requestAnimFrame(main);
			
			update();
			paint();
		},
		
		start = function(){
			world.maps.load(options.map || 'empty')
			.done(main);
		};
		
		return {
			start:	start
		};
	};
	
	return Engine;
});
