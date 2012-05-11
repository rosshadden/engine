define(function(){
	'use strict';
	
	return function(Σ){
		/*
			The mouse component allows an entity to listen to mouse triggers.

			@usage
			Σ.e('mouse')
			.on('mousedown:middle', function(m){
				//m.x - x position
				//m.y - y position
				//m.screenX - screen x position
				//m.screenY - screen y position
			})

			FUTURE: rename triggers to the standard format
			mousemove -> mouse:	move
		*/
		Σ.c('mouse')
		.statics({
			l:	[],
			
			press:	function(e){
				var b, c;
				
				//find which key
				if(e.which == null){
					//IE
					if(e.button < 2){
						b = 'left';    
					} else if(e.button == 4){
						b = 'middle';
					}else{
						b = 'right';    
					}
				}else{
					if(e.which < 2){
						b = 'left';    
					} else if(e.which == 2){
						b = 'middle';    
					}else{
						b = 'right';    
					}
				}
				
				c = 'mouse:	' + b;
				
				//register mouse action
				if(Σ.pressed.d){
					Σ.pressed.d[c] = (e.type == 'mousedown');
				}
			
				Σ.c('mouse').event(e, c);
			},
			
			event:	function(e, extra){
				var canvas = Σ.sys.canvas;
				
				//calculate mouse coordinate
				var x = canvas.width / canvas.offsetWidth,
					y = canvas.height / canvas.offsetHeight;
				
				//calculate offset
				if(e.offsetX != null){ //chrome, opera
					x *= e.offsetX;
					y *= e.offsetY;
				}else{ //firefox
					x *= e.layerX - canvas.offsetLeft;
					y *= e.layerY - canvas.offsetTop;
				}
				
				var listeners = Σ.c('mouse').l;
				
				/*
					if(Σ.preventDefault && Σ.preventDefault.d[key]){
					  e.preventDefault();
					}
				*/
				
				var c, t, obj;
				for(var i = 0; i < listeners.length; i++){
					t = listeners[i];
					if(t.screenable){
						x = Σ.screen.toScreenX(x);
						y = Σ.screen.toScreenY(y);
					}
					
					//offset mouse coordinates
					var tx = x + t.offX,
						ty = y + t.offY;
				  
					t.trigger(e.type, tx, ty, e);
				  
					if(extra){
						t.trigger(e.type+':	'+extra, tx, ty, e);
					}
				}
			},
			
			i:	function(){
				var c = Σ.sys.canvas;
				
				Σ.listener('mousedown', this.press, c);
				Σ.listener('mouseup', this.press, c);
				Σ.listener('mousemove', this.event, c);
				Σ.listener('click', this.event, c);
				Σ.listener('dblclick', this.event, c);
				Σ.listener('contextmenu', this.event, c);
			}
			
		})
		.defaults({
			offX:	0,
			offY:	0
		})
		.init(function(c){
			//add to listener array
			c.l.push(this);
		})
		.dispose(function(c){
			//remove from listener array
			c.l.splice(c.l.indexOf(this), 1);
		});
	};
});