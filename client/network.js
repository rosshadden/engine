define(function(){
	var self = this,
		socket,

	connect = function(){
		socket = io.connect('http://localhost');
	},

	on = function(){
		var args = Array.prototype.slice.call(arguments);
		
		socket.on.apply(socket, args);
	},

	emit = function(){
		var args = Array.prototype.slice.call(arguments);
		
		socket.emit.apply(socket, args);
	};

	return {
		connect:connect,
		on:		on,
		emit:	emit
	};
});
