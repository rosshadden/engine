define(function(){
	'use strict';
	
	return function(engine){
		/*
			The pressed method is used to check if a key or keys are currently pressed.
			This is most useful in mousemove, keydown or usually an update listener.

			@usage
			//move player
			engine.e('update image player.png')
			.on('update', function(){
			  
			  if(engine.pressed(['w', 'up'])){
				this.posY -= 10;
			  }

			});

			//click based on key
			engine.e('mouse image button.png')
			.on('click', function(){
			  
			  if(engine.pressed('mouse: middle')){
				//do something..
			  }

			});
		*/
		engine.pressed = function(key){
			var c = arguments;

			if(engine.is(key, 'array')){
				c = key;
			}

			for(var i = 0, l = c.length; i < l; i++){
				if(engine.pressed.d[c[i]]){
					return true;
				}
			}

			return false;
		};
		
		engine.pressed.d = {};
	};
});