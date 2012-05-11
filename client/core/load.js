define(function(){
	'use strict';
	
	return function(Σ){
		var b = function(assets){
			return new Σ.load.init(assets);	
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
			Σ.load('tiles.png add.js attack.mp3')
			.complete(function(arrayOfAssets){
				//	create new bitmap of tiles.png
				Σ.e('bitmap tiles.png');
				
				//	new sound
				Σ.e('sound attack.mp3');
				
				//	access image staticaly or localy
				Σ.comp('tiles.png').image;
				Σ.entity('tiles.png').image;
			})
			.error(function(assetThatCausedError){
				//	error
			})
			.progress(function(current, total, assetLoaded){
				//	called on loads
			});
		
			@warning only supports loading images and sounds
		
			//	load sound
		
			//	Σ.support will return the supported codec
			Σ.load('run.' + Σ.support('ogg', 'aac'));
		
			FUTURE remove directories from calls
		*/
		var l = function(assets){
			if(Σ.is(assets,'string')){
				this.assets = assets.split(' ');
			}else if(Σ.is(assets,'object')){
				this.assets = [];
				for(var i in assets){
					if(Σ.is(assets[i], 'array')){
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
			    var Σ = a;
			    
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
			    
			    if(Σ.load.images.indexOf(ext) != -1){ //	make sure image is allowed
					this._loadImg(Σ, a, n);
				}else if(Σ.load.sounds.indexOf(ext) != -1){ //	make sure sound is allowed
					//	soundmanager only supports mp3, so use it if the sound is mp3
					if(window['soundManager'] && ext == 'mp3' || Σ.support(ext)){
						//	don't load the same sound twice
						if(Σ._c[n + Σ.load.soundExt]){ 
						//	remove from array
							this.total--;
							continue;
						}else{
							this._loadSound(Σ, a, n);
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
			Σ.c(a)
			.alias(n + Σ.load.imageExt)
			.statics({
			    image:img
			})
			.defines({
				//	save image for other components to copy or use
				_image:img
			});
			
			img.onload = function(){
				Σ.c(a).defines({
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
			
			img.src = Σ.load.path + src;
			
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
			var that = this, Σ;
			
			if(window['soundManager']){
				//	use soundmanager!
				soundManager.onready(function(){
					Σ = soundManager.createSound({
						id:			a,
						url:		Σ.load.path + src,
						autoLoad:	true,
						onload:		function(){
							that._loaded();
						}
					});

					that._def_sfx(Σ, a, n);
				});
			}else{
				Σ = new Audio(Σ.load.path + src);
				Σ.src = Σ.load.path + src;
				Σ.preload = "auto";
				Σ.load();

				//	called multiple times in firefox
				var f = function(){
					that._loaded();
					//	remove after first call
					Σ.removeEventListener('canplaythrough', f);
				};

				Σ.addEventListener('canplaythrough', f, false);

				Σ.addEventListener('error', function(){
					if(that._e){
						that._e.call(that, a);
					}
				}, false);

				this._def_sfx(Σ, a, n);
			}
		};
		
		p._def_sfx = function(Σ, a, n){
			Σ.c(a)
			//	create statics codec for easy use
			.alias(n + Σ.load.soundExt)
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
