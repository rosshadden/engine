define(function(){
	var self = this,
		$self = $(self),
	
	events = {},
	$events = $(events),
	
	listen = function(){
		$events.on.apply($events, arguments);
	},
	
	emit = function(){
		$events.trigger.apply($events, arguments);
	};
	
	return {
		listen:	listen,
		emit:	emit
	};
});
