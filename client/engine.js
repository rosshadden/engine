define(['engine/world', 'engine/draw', 'engine/viewport', 'engine/resources', 'engine/input/input', 'engine/events', 'engine/audio', 'engine/network', 'engine/utilities'], function(world, draw, viewport, resources, input, events, audio, network, utilities){
	var Engine = function(options){
		var self = this,
			
		deferred = new $.Deferred,
	    
        //  Need to pass this to the drawing library.
		screen = options.screen || $('canvas')[0],
		
		execute = function(what){
			if(typeof options[what] === 'function'){
				options[what].call(self);
			}
		},
		
		init = function(){
			//	main.js needs to be able to configure these.
			//	I think I should make each module take initialization variables
			//		before becoming modules.
			//world.maps.setCurrent('map1');
			draw.setDimensions({
				width:	600,
				height:	400
			}, world.cell);
			
			viewport.setDimensions({
				width:	600,
				height:	400
			});
			
			if($('#engine-cache').length === 0){
				$('<div>', {
					id:	'engine-cache'
				}).appendTo('body');
			}
            
			//	convenient shortcuts
			self.world = world;
			self.resources = resources;
			self.input = input;
			self.events = events;
			self.audio = audio;
			self.network = network;
			self.utilities = utilities;
            self.bind = {
				key:	input.keyboard.bind.key,
				axis:	input.keyboard.bind.axis
			};
			
			execute('init');
			
			deferred.resolve(self.methods);
		},
		
		update = function(){
			execute('update');
		},
		
		paint = function(){
			var map = world.maps.get(world.maps.getCurrent());
			
			draw
			.backdrop(viewport.getDimensions())
			.cells()
			.layer(map.element, world.toXY(map.properties.dimensions));
            
			for(var entity in world.entities){
				world.entities[entity].draw();
			}
			
			execute('paint');
		},
		
		main = function(){
			if(self.running){
				requestAnimFrame(main);
			
				update();
				paint();
			}
		},
		
		start = function(){
			self.running = true;
			
			init();
			
			world.maps.load(options.map || 'empty')
			.done(main);
		},
		
		end = function(){
			var def = new $.Deferred;
			
			self.running = false;
			
			def.resolve();
			
			return def.promise();
		};
		
		return self.methods = {
			world:		world,
			resources:	resources,
			input:		input,
			events:		events,
			audio:		audio,
			network:	network,
			utilities:	utilities,
			bind: {
				key:	input.keyboard.bind.key,
				axis:	input.keyboard.bind.axis
			},
			start:		start,
			end:		end,
			deferred:	deferred.promise(),
			viewport:	viewport
		};
	};
	
	return Engine;
});