define(function(){
	var self = this,
		$self = $(self),
	
	events = {},
	$events = $(events),
	
	on = function(){
		$events.on.apply($events, arguments);
	},
	
	emit = function(){
		$events.trigger.apply($events, arguments);
	};
	
	return {
		on:		on,
		emit:	emit
	};
});
