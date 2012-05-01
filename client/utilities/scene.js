define(function(){
	return function(engine){
		/*
			Goes to an other scene in the game. This calls the scene method with a possible object argument.

			Scenes are a helpful way to organize stages of a game.

			//create scene
			engine.scene('game')
			.enter(function(data){
				
				//remove all 2d elements
				engine('2d').dispose();
				
				loadLevel(data.level);
				
			});

			//go to scene
			engine.scene('game').enter({tiles:[]} );

			*warning- bad idea passing in functions as the first argument

			//create manually
			engine.e('scene:game')
			.enter(function(){
			  
			})
		*/
		engine.scene = function(title){
			var s = engine.c('scene');

			if(!engine.is(title)){
				return s._scenes[engine.scene.current];
			}

			if(!s._scenes[title]){
				//add scene
				engine.e('scene:'+title);
			}

			return s._scenes[title];
		};

		engine.c('scene')
		.statics({
			_scenes:	{}
		})
		.init(function(c, title){
			c._scenes[title] = this;
			this.sceneName = title;
		})
		.dispose(function(c){
			delete c._scenes[this.sceneName];
		})
		.defines({
			enter:	function(title){
				var args = Array.prototype.slice.call(arguments);
				
				if(!engine.is(title, 'function')){
					if(engine.scene.current){
						engine.scene().exit();
					}

					//set current scene
					engine.scene.current = this.sceneName;

					if(this.scene_enter){
						this.scene_enter.apply(this, args);
					}
				}else{
					//set new enter method
					this.scene_enter = title;
				}

				return this;
			},

			exit:	function(m){
				var args = Array.prototype.slice.call(arguments);
				
				if(!engine.is(m, 'function')){
					engine.scene.current = '';

					if(this.scene_exit){
						this.scene_exit.apply(this, args);
					}
				}else{
					this.scene_exit = m;
				}

				return this;
			}

		});
	};
});
