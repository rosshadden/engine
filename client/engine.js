define(['engine/utilities'], function(utilities){
	var Engine = function(options){
		var self = this,
		
		execute = function(){
			if(typeof options[what] === 'function'){
				options[what].call(self);
			}
		},
		
		init = (function(){
			execute('init');
		})(),
		
		update = function(){
			execute('update');
		},
		
		paint = function(){
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
