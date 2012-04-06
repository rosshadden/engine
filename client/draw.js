define(function(){
	var self = this,
	
	dimensions = {
		width:	0,
		height:	0
	},
	
	cell = {
		width:	0,
		height:	0
	},
		
	Sprite = function(properties){
		var sprite = {
			image:	new Image()
		};
		
		for(var property in properties){
			sprite[property] = properties[property];
		}
		
		sprite.image.src = properties.source;
		
		return sprite;
	},
	
	easel = {
		screen:		$('#screen')[0].getContext('2d'),
		element: {
			screen:		$('#screen')[0]
		}
	},
	
	getDimensions = function(){
		return {
			width:	dimensions.width,
			height:	dimensions.height
		};
	},
	
	setDimensions = function(width, height, cells){
		easel.element.screen.width = width;
		easel.element.screen.height = height;
		
		dimensions.width = width;
		dimensions.height = height;
		cell = cells;
	},
	
	backdrop = function(width, height){
		easel.screen.fillStyle = 'rgba(200, 200, 200, 1)';
		//easel.screen.clearRect(0,0,width,height);
		easel.screen.fillRect(0, 0, width, height);
	},
	
	path = function(x, y, x2, y2, options){
		var canvas,
			defaults = {
				canvas:		easel.screen,
				width:		1,
				color:		'rgba(0, 0, 0, 1)',
				lineCap:	'round',
				lineJoin:	'round'
			};
		
		options = $.extend(defaults, options);
		
		canvas = options.canvas;
		
		canvas.beginPath();
		canvas.moveTo(x,y);
		canvas.lineTo(x2,y2);
		canvas.strokeStyle = options.color;
		canvas.lineWidth = options.width;
		canvas.lineJoin = options.lineJoin;
		canvas.lineCap = options.lineCap;
		canvas.stroke();
	},
	
	image = function(properties, ctx){
		ctx = ctx || easel.screen;
		
		ctx.drawImage(
			properties.src,
			properties.source.position.x,
			properties.source.position.y,
			properties.source.dimensions.w,
			properties.source.dimensions.h,
			properties.destination.position.x,
			properties.destination.position.y,
			properties.destination.dimensions.w,
			properties.destination.dimensions.h
		);
	},
	
	sprite = function(properties, ctx){
		ctx = ctx || easel.screen;
		
		ctx.drawImage(
			properties.src,
			properties.sprite.x,
			properties.sprite.y,
			properties.sprite.w,
			properties.sprite.h,
			properties.position && properties.position.x || 0,
			properties.position && properties.position.y || 0,
			properties.width,
			properties.height
		);
	},
	
	layer = function(source, dimensions, ctx){
		ctx = ctx || easel.screen;
		
		ctx.drawImage(
			source,
			0,
			0,
			dimensions.width,
			dimensions.height,
			0 - viewport.getPosition().x,
			0 - viewport.getPosition().y,
			dimensions.width,
			dimensions.height
		);
	},
	
	cells = function(){
		var x, y;
		
		for(x = cell.width; x < dimensions.width; x += cell.width){
			path(x, 0, x, dimensions.height, {
				color:	'rgba(0, 0, 0, .2)'
			});
		}
		for(y = cell.height; y < dimensions.height; y += cell.height){
			path(0, y, dimensions.width, y, {
				color:	'rgba(0, 0, 0, .2)'
			});
		}
	};
	
	return {
		Sprite:			Sprite,
		easel:			easel,
		getDimensions:	getDimensions,
		setDimensions:	setDimensions,
		backdrop:		backdrop,
		path:			path,
		image:			image,
		sprite:			sprite,
		layer:			layer,
		cells:			cells
	};
});
