define(['engine/draw', 'engine/utilities'], function(draw, utilities){
	var Engine = function(options){
		var self = this,
		
		execute = function(what){
			if(typeof options[what] === 'function'){
				options[what].call(self);
			}
		},
		
		init = (function(){
			draw.setDimensions(600, 400, {
				width:	25,
				height:	25
			});
			
			execute('init');
		})(),
		
		update = function(){
			execute('update');
		},
		
		paint = function(){
			draw.backdrop(draw.getDimensions().width, draw.getDimensions().height);
			
			draw.cells();
			
			execute('paint');
		},
		
		main = function(){
			requestAnimFrame(main);
			
			update();
			paint();
		},
		
		start = function(){
			main();
		};
		
		return {
			start:	start
		};
	};
	
	return Engine;
});
