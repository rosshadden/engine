define(function(){
	var self = {},
	
	dimensions = {
		width:	0,
		height:	0
	},
	
	cell = {
		width:	0,
		height:	0
	},
	
	easel = {
		screen:		$('#screen')[0].getContext('2d'),
		element: {
			screen:		$('#screen')[0]
		}
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
	
	setDimensions = function(dim, cells){
		easel.element.screen.width = dimensions.width = dim.width;
		easel.element.screen.height = dimensions.height = dim.height;
		
		cell = cells;
		
		return self.methods;
	},
	
	backdrop = function(dim){
		easel.screen.fillStyle = 'rgba(200, 200, 200, 1)';
		
		easel.screen.fillRect(0, 0, dim.width, dim.height);
		
		return self.methods;
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
		
		return self.methods;
	},
	
	text = function(properties, ctx){
		ctx = ctx || easel.screen;
		
		ctx.fillStyle =  properties.color || 'rgba(0, 0, 0, 1)';
		ctx.textBaseline =  properties.baseline || 'top';
		ctx.textAlign = properties.align || 'left';
		ctx.font =  properties.font || '25px Arial';
		
		ctx.fillText(properties.text, properties.x, properties.y);
		
		return self.methods;
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
		
		return self.methods;
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
		
		return self.methods;
	},
	
	layer = function(source, dimensions, ctx){
		ctx = ctx || easel.screen;
		
		ctx.drawImage(
			source,
			
			0,
			0,
			dimensions.width,
			dimensions.height,
			
			0,// - viewport.getPosition().x,
			0,// - viewport.getPosition().y,
			dimensions.width,
			dimensions.height
		);
		
		return self.methods;
	},
	
	cells = function(){
		var x, y,
			width = dimensions.width,
			height = dimensions.height;
		
		for(x = cell.width; x < width; x += cell.width){
			path(x, 0, x, height, {
				color:	'rgba(0, 0, 0, .2)'
			});
		}
		
		for(y = cell.height; y < height; y += cell.height){
			path(0, y, width, y, {
				color:	'rgba(0, 0, 0, .2)'
			});
		}
		
		return self.methods;
	};
	
	return self.methods = {
		Sprite:			Sprite,
		easel:			easel,
		setDimensions:	setDimensions,
		backdrop:		backdrop,
		path:			path,
		text:			text,
		image:			image,
		sprite:			sprite,
		layer:			layer,
		cells:			cells
	};
});
