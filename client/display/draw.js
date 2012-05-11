define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('draw')
		.interfaces('draw')
		.init(function(){
			Σ.drawlist().add(this);
		})
		.dispose(function(c){
			this.drawlist.remove(this);
		})
		.defaults({
			screenable:	true,
			drawable:	true,
			rotation:	0,
			alpha:		1,
			
			scaleX:		1,
			scaleY:		1,
			
			posX:		0,
			posY:		0,
			
			sizeX:		10,
			sizeY:		10,
			
			regX:		0,
			regY:		0
		})
		.defines({
			depth:	function(){
				return this.posY;
			},
		  
			/* NOT WORKING
				cache:	function(){
					if(!this.image) return this;
					
					this.clearCache();
					
					var c = Σ.$new('canvas');
					var s = Math.max(this.image.width, this.image.height);
					c.width = s;
					c.height = s;
					
					this.draw_render(c.getContext(Σ.sys.contextType));
					
					this.canvasCache = c;
					
					return this;
				},
				
				clearCache:	function(){
					this.canvasCache = null;
				},
			*/
			
			drawFirst:	function(){
				var l = this.drawlist.list;
				
				l.splice(l.indexOf(this), 1);
				
				l.unshift(this);
				return this;
			},
			
			drawLast:	function(){
				var l = this.drawlist.list;
				
				l.splice(l.indexOf(this), 1);
				
				l.push(this);
				return this;
			},
			
			drawAfter:	function(en){
				var l = this.drawlist.list,
					him = l.indexOf(en),
					me = l.indexOf(this);
				
				if(him > me){
					//swap
					var t = l[him];
					l[him] = l[me];
					l[me] = t;
				}
				
				return this;
			},
			
			drawBefore:	function(en){
				var l = this.drawlist.list,
					him = l.indexOf(en),
					me = l.indexOf(this);
				
				if(him < me){
					//swap    
					var t = l[him];
					l[him] = l[me];
					l[me] = t;
				}
				
				return this;
			},
			
			screenX:	function(x){
				if(x){
					this.posX = x + Σ.screen.posX;
					return this;
				}
				return this.posX - Σ.screen.posX;
			},
			
			screenY:	function(y){
				if(y){
					this.posY = y + Σ.screen.posY;
					return this;
				}
				return this.posY - Σ.screen.posY;
			},
			
			/*
				Renders the entity to the canvas. Goes through the transformations, scaling, alpha etc...
			*/
			render:	function(c){
				this.draw_before(c);
				this.draw(c);
				this.draw_after(c);
			},
			
			/*
			Returns true or false wether the object is visible on screen.
			*/
			visible:	function(){
				return this.drawable && Σ.screen.hit(this.posX - this.regX, this.posY - this.regY, this.sizeX, this.sizeY);
			}
			
		})
		.namespaces({
			before:	function(c){
				c.save();

				if(this.alpha != 1){
					c.staticsAlpha = this.alpha;
				}

				if(this.screenable){
					c.translate(this.screenX(), this.screenY());
				}else{
					c.translate(this.posX, this.posY);
				}

				if(this.rotation){
					c.rotate(this.rotation * Math.PI / 180);
				}

				if(this.scaleX != 1 || this.scaleY != 1){
					c.scale(this.scaleX, this.scaleY);
				}
			},
			
			after:	function(c){
				c.restore();
			}
		});
	};
});