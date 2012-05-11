define(function(){
	'use strict';
	
	return function(Σ){
		/*
			The pressed method is used to check if a key or keys are currently pressed.
			This is most useful in mousemove, keydown or usually an update listener.

			@usage
			//move player
			Σ.e('update image player.png')
			.on('update', function(){
			  
			  if(Σ.pressed(['w', 'up'])){
				this.posY -= 10;
			  }

			});

			//click based on key
			Σ.e('mouse image button.png')
			.on('click', function(){
			  
			  if(Σ.pressed('mouse: middle')){
				//do something..
			  }

			});
		*/
		Σ.pressed = function(key){
			var c = arguments;

			if(Σ.is(key, 'array')){
				c = key;
			}

			for(var i = 0, l = c.length; i < l; i++){
				if(Σ.pressed.d[c[i]]){
					return true;
				}
			}

			return false;
		};
		
		Σ.pressed.d = {};
	};
});