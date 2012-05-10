define(function(){
	'use strict';
	
	return function(engine){
		var b = function(assets){
			return new engine.load.init(assets);	
		};
		
		b.path = "";
		
		b.imageExt = 'img';
		b.soundExt = 'sfx';
		b.images = ['gif', 'jpg', 'jpeg', 'png'];
		b.sounds = ['wav', 'mp3', 'aac', 'ogg'];
		
		/*
			Loads images, sounds and other files into components.
		
			All loaded assets will be put into a component with a ref to the asset.
		
			//	example of loading assets
			engine.load('tiles.png add.js attack.mp3')
			.complete(function(arrayOfAssets){
				//	create new bitmap of tiles.png
				engine.e('bitmap tiles.png');
				
				//	new sound
				engine.e('sound attack.mp3');
				
				//	access image staticaly or localy
				engine.comp('tiles.png').image;
				engine.entity('tiles.png').image;
			})
			.error(function(assetThatCausedError){
				//	error
			})
			.progress(function(current, total, assetLoaded){
				//	called on loads
			});
		
			@warning only supports loading images and sounds
		
			//	load sound
		
			//	engine.support will return the supported codec
			engine.load('run.' + engine.support('ogg', 'aac'));
		
			FUTURE remove directories from calls
		*/
		var l = function(assets){
			if(engine.is(assets,'string')){
				this.assets = assets.split(' ');
			}else if(engine.is(assets,'object')){
				this.assets = [];
				for(var i in assets){
					if(engine.is(assets[i], 'array')){
						this.assets = this.assets.concat(assets[i]);
					}
				}
			}else{
				this.assets = assets;
			}
			
			var a;
			for(var i = 0; i < this.assets.length; i++){
			    this.total++;
			    
			    a = this.assets[i];
			    
			    //	copy full source path
			    var s = a;
			    
			    //	remove directories
			    var d = a.lastIndexOf('/');
			    if(d != -1){
			 	   a = a.substr(d + 1, a.length);
			    }
			    
			    //	find file extension
			    var j = a.lastIndexOf('.') + 1;
			    var ext = a.substr(j).toLowerCase();
			    
			    //	find name
			    var n = a.substr(0, j);
			    
			    if(engine.load.images.indexOf(ext) != -1){ //	make sure image is allowed
					this._loadImg(s, a, n);
				}else if(engine.load.sounds.indexOf(ext) != -1){ //	make sure sound is allowed
					//	soundmanager only supports mp3, so use it if the sound is mp3
					if(window['soundManager'] && ext == 'mp3' || engine.support(ext)){
						//	don't load the same sound twice
						if(engine._c[n + engine.load.soundExt]){ 
						//	remove from array
							this.total--;
							continue;
						}else{
							this._loadSound(s, a, n);
						}
					}else{
				 	 //	sound can't be loaded
			 	 	this.total--;
			 	 	continue;
			 	   }
			    }
			}
			
			return this;
		}
		
		var p = l.prototype;
		
		p.current = 0;
		p.total = 0;
		
		p._loadImg = function(src, a, n){
			var that = this;
			var img = new Image();
			
			//	create new image component
			engine.c(a)
			.alias(n + engine.load.imageExt)
			.statics({
			    image:img
			})
			.defines({
				//	save image for other components to copy or use
				_image:img
			});
			
			img.onload = function(){
				engine.c(a).defines({
					sizeX:img.width,
					sizeY:img.height,
					bisect:img.width
				});

				that._loaded();
			};
			
			img.onerror = function(){
			    
			    if(that._e){
			 	   that._e.call(that, a);
			    }
			};
			
			img.src = engine.load.path + src;
			
			return this;
		};
		
		p._loaded = function(){
		  this.current++;
		  
		  if(this.current <= this.total){
			if(this._p){
			    this._p(this.current, this.total, this.assets[this.current-1]);
			}
		  }
		  if(this.current == this.total){
			  if(this._s){
			    this._s(this.assets);
			  }
			}
		};
		
		/*
		src - original string
		a - filename
		n - filename without extension
		*/
		p._loadSound = function(src, a, n){
			var that = this, s;
			
			if(window['soundManager']){
				//	use soundmanager!
				soundManager.onready(function(){
					s = soundManager.createSound({
						id:			a,
						url:		engine.load.path + src,
						autoLoad:	true,
						onload:		function(){
							that._loaded();
						}
					});

					that._def_sfx(s, a, n);
				});
			}else{
				s = new Audio(engine.load.path + src);
				s.src = engine.load.path + src;
				s.preload = "auto";
				s.load();

				//	called multiple times in firefox
				var f = function(){
					that._loaded();
					//	remove after first call
					s.removeEventListener('canplaythrough', f);
				};

				s.addEventListener('canplaythrough', f, false);

				s.addEventListener('error', function(){
					if(that._e){
						that._e.call(that, a);
					}
				}, false);

				this._def_sfx(s, a, n);
			}
		};
		
		p._def_sfx = function(s, a, n){
			engine.c(a)
			//	create statics codec for easy use
			.alias(n + engine.load.soundExt)
			.statics({
				sound:	s
			})
			.defines({
				_sound:	s
			});
		};
		
		p.progress = function(m){
			this._p = m;
			
			return this;
		};
		
		p.complete = function(m){
			this._s = m;
			
			if(this.assets.length == 0){
				m([]);
			}
		
			return this;
		};
		
		p.error = function(m){
			this._e = m;
			
			return this;
		};
		
		b.init = l;
		
		return b;
	};
});
