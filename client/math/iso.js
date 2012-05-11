define(function(){
	'use strict';
	
	return function(Σ){
		Σ.iso = Σ.c('iso')
		.statics({
			sizeX:	30,
			sizeY:	30,
			sizeZ:	30,
			
			/*
			Converts an x position into the closest iso x position.
			*/
			toPosX:	function(x, y){
				var isox = this.toIsoX(x, y),
					isoy = this.toIsoY(x, y);
				
				return (isox - isoy) * this.sizeX;
			},
			
			toPosY:	function(x, y){
				var isox = this.toIsoX(x, y),
					isoy = this.toIsoY(x, y);
				
				return (isox + isoy) * this.sizeY * 0.5;
			},
			
			toPos:	function(x, y){
				if(Σ.is(x,'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				
				return {
					posX:	this.toPosX(x, y),
					posY:	this.toPosY(x, y)
				};
			},
			
			toIsoX:	function(x, y){
				var ym = (2*y - x) * 0.5,
					xm = x + ym;
				
				return Math.round(xm / this.sizeX)-1;
			},
			
			toIsoY:	function(x, y){
				var ym = (2*y - x) * 0.5;
				
				return Math.round(ym / this.sizeY);
			},
			
			toIso:	function(x, y){
				if(Σ.is(x, 'object')){
					y = x.posY || x.y;
					x = x.posX || x.x;
				}
				return {
					isoX:	this.toIsoX(x, y),
					isoY:	this.toIsoY(x, y)
				};
			}
		})
		.defaults({
			posX:	0,
			posY:	0,
			posZ:	0
		})
		.defines({
			/*
				Moves the iso entity to the given isometric position.
				
				examples:
				
				e.iso(1, 0, 0);
				
				e.iso(otherIso);
				
				e.iso({
					x:	1,
					y:	1,
					z:	2
				});
			*/
			iso:	function(x, y, z){
				if(Σ.is(x,'object')){
					z = x.z;
					
					if(Σ.is(x.posZ)){
						z = x.posZ / Σ.iso.sizeZ;
					}
					
					y = x.y;
					
					//copy attributes
					if(Σ.is(x.posX) && Σ.is(x.posY)){
						this.posX = x.posX;
						this.posY = x.posY;
						
						if(x.posZ){
							this.posZ = x.posZ;
						}
						
						return this;
					}
					
					x = x.x;
				}
				
				//convert to screen space
				x = (Σ.is(x)) ? x : this.isoX();
				x *= Σ.iso.sizeX;
				
				//posY handles a lot of transformations, its safest to recalculate it
				y = (Σ.is(y)) ? y : this.isoY();
				y *= Σ.iso.sizeY;
				
				z = (Σ.is(z)) ? z : this.isoZ();
				z *= Σ.iso.sizeZ;
				
				//all values should be in screen space from here
				this.posX = x - y;
				this.posY = (x + y) * 0.5 - z;
				this.posZ = z;
				
				return this;
			},
			
			isoX:	function(value){
				if(Σ.is(value)){
					return this.iso(value);
				}
				
				return (this.posX + (2*(this.posY+this.posZ) - this.posX) * 0.5) / Σ.iso.sizeX;
			},
			
			isoY:	function(value){
				if(Σ.is(value)){
					return this.iso({
						y:	value
					});
				}
				
				return ((2*(this.posY+this.posZ) - this.posX) * 0.5) / Σ.iso.sizeY;
			},
			
			isoZ:	function(value){
				if(Σ.is(value)){
					return this.iso({
						z:	value
					});
				}
				
				return this.posZ / Σ.iso.sizeZ;
			},
			
			//returns true if the current iso position is directly on top of a tile.
			onIso:	function(){
				var total = this.isoX() + this.isoY() + this.isoZ();
				return (total|0) == total;
			}
		});
	};
});