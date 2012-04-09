define(['engine/world', 'engine/utilities'], function(world, utilities){
	var self = this,
	
	rectangle = function(one, two){
		var map = function(entity){
			return {
				x:		entity.position.x,
				y:		entity.position.y,
				width:	entity.dim.width,
				height:	entity.dim.height
			};
		};
		
		one = map(one);
		two = map(two);
		
		one.left = one.x;
		one.right = one.x + one.width;
		one.top = one.y;
		one.bottom = one.y + one.height;
		
		two.left = two.x;
		two.right = two.x + two.width;
		two.top = two.y;
		two.bottom = two.y + two.height;
		
		if(
			one.bottom < two.top
		||	one.top > two.bottom
		||	one.right < two.left
		||	one.left > two.right
		){
			return false;
		}
		
		return true;
	},
	
	wall = function(entity, which){
		var map = world.maps.get(world.maps.getCurrent());
		
		if((which === 'left' || which === 'any') && entity.position.x <= 0){
			return true;
		}
		
		if((which === 'right' || which === 'any') && entity.position.x >= map.element.width){
			return true;
		}
		
		if((which === 'top' || which === 'any') && entity.position.y <= 0){
			return true;
		}
		
		if((which === 'bottom' || which === 'any') && entity.position.y >= map.element.height){
			return true;
		}
		
		return false;
	};
	
	return {
		rectangle:	rectangle,
		wall:		wall
	};
});
