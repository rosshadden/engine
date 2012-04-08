define(function(){
	//	Need to make face-collision vs area-collision.
	return function(entityOne, entityTwo) {
		var	left1 = entityOne.position.x,
			right1 = entityOne.position.x + entityOne.dim.width,
			top1 = entityOne.position.y,
			bottom1 = entityOne.position.y + entityOne.dim.height,
			
			left2 = entityTwo.position.x,
			right2 = entityTwo.position.x + entityTwo.dim.width,
			top2 = entityTwo.position.y,
			bottom2 = entityTwo.position.y + entityTwo.dim.height;
		
		return !(left1 > right2 || left2 > right1 || top1 > bottom2 || top2 > bottom1);
	};
});
