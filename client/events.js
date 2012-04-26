define(function(){
	var self = this,
		$self = $(self),
	
	events = {},
	$events = $(events),
	
	on = function(){
		var args = Array.prototype.slice.call(arguments);
		
		switch(args[0]){
			case 'click':
				var $asdf = $(document);
				$asdf.on.apply($asdf, args);
				break;
			
			default:
				$events.on.apply($events, args);
		}
	},
	
	emit = function(){
		var args = Array.prototype.slice.call(arguments);
		$events.trigger.apply($events, args);
	};
	
	return {
		on:		on,
		emit:	emit
	};
});
