define(function(){
	return function(engine){
		/*
			The mouse component allows an entity to listen to mouse triggers.

			@usage
			engine.e('mouse')
			.on('mousedown:	middle', function(m){
				//m.x - x position
				//m.y - y position
				//m.screenX - screen x position
				//m.screenY - screen y position
			})

			FUTURE: rename triggers to the standard format
			mousemove -> mouse:	move
		*/
		engine.c('mouse')
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
				if(engine.pressed.d){
					engine.pressed.d[c] = (e.type == 'mousedown');
				}
			
				engine.c('mouse').event(e, c);
			},
			
			event:	function(e, extra){
				var canvas = engine.sys.canvas;
				
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
				
				var listeners = engine.c('mouse').l;
				
				/*
					if(engine.preventDefault && engine.preventDefault.d[key]){
					  e.preventDefault();
					}
				*/
				
				var c, t, obj;
				for(var i=0; i<listeners.length; i++){
					t = listeners[i];
					if(t.screenable){
						x = engine.screen.toScreenX(x);
						y = engine.screen.toScreenY(y);
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
				var c = engine.sys.canvas;
				
				engine.listener('mousedown', this.press, c);
				engine.listener('mouseup', this.press, c);
				engine.listener('mousemove', this.event, c);
				engine.listener('click', this.event, c);
				engine.listener('dblclick', this.event, c);
				engine.listener('contextmenu', this.event, c);
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