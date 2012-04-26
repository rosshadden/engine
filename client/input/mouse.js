define(['engine/viewport'], function(viewport){
	var on = function(action, handler){
		//TODO:	Use the actual defined screen canvas.
		$('canvas').on(action, function(event){
			var self = this,
				$self = $(self);
			
			var point = {
				x:	~~(event.offsetX / 25),
				y:	~~(event.offsetY / 25)
			};
			
			handler.call(self, point);
		});
	};
	
	return {
		on:	on
	};
});