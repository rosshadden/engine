define(function(){
	'use strict';
	
	return function(engine){
		/*
			The sound component utilizes the new HTML5 to play sound effects in the web browser.
			It is reccommended to load two sound codecs OGG and AAC because not every browser supports
			all sound codecs at this time.

			//load a sound
			engine.load('run.ogg run.aac');
			//BAD this will load both sounds. Even if the browser doesn't support one

			//GOOD. load just one codec of the sound
			var codec;
			if(engine.support('ogg')){
				codec = 'ogg';
			} else if(engine.support('aac')){
				codec = 'aac';
			}

			engine.load('run.'+codec');

			//create sound
			engine.e('sound run.'+codec);

			//that is a pain, so a helper method has been created
			engine('sound run.'+engine.support('ogg', 'aac'));

			Its recomended to save the supported codec somewhere
			//like so...
			engine.codec = engine.support('ogg', 'aac');

			engine.load('run.'+engine.codec);

			engine.e('run.'+engine.codec);

			WARNING: Because the sound component has generic
			method names stop, play, watchout for overwrites.

			Sound Tip
			//find all sounds in game and play them!
			engine('sound').method('play');

			*note: A sound only only has one channel and cannot be played multiple times at once.
			This will be fixed with the channel component.
		*/
		engine.sound = engine.c('sound')
		.statics({
			enabled:	true
		})
		.defaults({
			playing:	false
		})
		.namespaces({
			e:	false,
		  
			ended:	function(){
				this.trigger('sound:finish');
			}
		})
		.defines({
			play:	function(){
				if(!this._sound || !engine.sound.enabled){
					return this;
				}
				
				if(this.playing){
					this.stop();
				}
				
				var c = this._sound,
					that = this;
				
				if(window['soundManager']){
					c.play({
						onfinish:	function(){
							that.sound_ended();
						}
					});
				}else{
					c.currentTime = 0;
				  
					if(!this.sound_e){
						this.sound_e = true;
						
						var f = function(){
							that.sound_ended();
							c.removeEventListener('ended', f);
							that.sound_e = false;
						};
					
						c.addEventListener('ended', f, false);
					
					}
					c.play();
				}
			  
				return this;
			},
			
			resume:	function(){
				this._sound.play();
				this.playing = true;
				
				return this;
			},
			
			pause:	function(){
				this._sound.pause();
				this.playing = false;
				
				return this;
			}
		});
	};
});