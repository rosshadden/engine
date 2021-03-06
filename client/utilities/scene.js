﻿define(function(){
	'use strict';
	
	return function(Σ){
		/*
			Goes to an other scene in the game. This calls the scene method with a possible object argument.

			Scenes are a helpful way to organize stages of a game.

			//	create scene
			scene('game')
			.enter(function(data){
				//	remove all 2d elements
				Σ('2d').dispose();
				
				loadLevel(data.level);
			});

			//	go to scene
			scene('game').enter({tiles:[]});

			*warning- bad idea passing in functions as the first argument

			//	create manually
			Σ.e('scene:game')
			.enter(function(){
			  
			})
		*/
		var scene = function(title){
			var s = Σ.c('scene');

			if(!Σ.is(title)){
				return s._scenes[scene.current];
			}

			if(!s._scenes[title]){
				//	add scene
				Σ.e('scene:'+title);
			}

			return s._scenes[title];
		};

		Σ.c('scene')
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
				
				if(!Σ.is(title, 'function')){
					if(scene.current){
						scene().exit();
					}

					//	set current scene
					scene.current = this.sceneName;

					if(this.scene_enter){
						this.scene_enter.apply(this, args);
					}
				}else{
					//	set new enter method
					this.scene_enter = title;
				}

				return this;
			},

			exit:	function(m){
				var args = Array.prototype.slice.call(arguments);
				
				if(!Σ.is(m, 'function')){
					scene.current = '';

					if(this.scene_exit){
						this.scene_exit.apply(this, args);
					}
				}else{
					this.scene_exit = m;
				}

				return this;
			}

		});
		
		return scene;
	};
});
