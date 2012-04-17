define(function(){
	var self = this,
	
		x = 0,
		y = 0,
		dimensions = {
			width:	0,
			height:	0
		},
	
	setDimensions = function(dim){
		dimensions.width = dim.width;
		dimensions.height = dim.height;
	},
	
	getDimensions = function(){
		return {
			width:	dimensions.width,
			height:	dimensions.height
		};
	},
	
	getPosition = function(){
		return {
			x:	x,
			y:	y
		};
	},
	
	move = function(newX, newY){
		x = (typeof newX === 'number') ? newX : x;
		y = (typeof newY === 'number') ? newY : y;
	},
	
	moveBy = function(newX, newY){
		move(x + newX, y + newY);
	},
	
	centerAt = function(point){
		//	Why are these hardcoded...?
		var x = 200,
			y = 300;
		
		if(point === 'center'){
			move(
				~~(x - dimensions.width / 2),
				~~(y - dimensions.height / 2)
			);
		}else if(point && point.x && point.y){
			move(
				~~(point.x - dimensions.width / 2),
				~~(point.y - dimensions.height / 2)
			);
		}
		
		return {
			x:	~~(dimensions.width / 2),
			y:	~~(dimensions.height / 2)
		};
	};
	
	return {
		setDimensions:	setDimensions,
		getDimensions:	getDimensions,
		getPosition:	getPosition,
		move:			move,
		moveBy:			moveBy,
		centerAt:		centerAt
	};
});
