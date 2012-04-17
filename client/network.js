define(function(){
	var network = (function(){
		var self = this,
			socket,

		connect = function(){
			socket = io.connect('http://localhost');
		
			return self.methodss;
		},

		on = function(){
			var args = Array.prototype.slice.call(arguments);
		
			socket.on.apply(socket, args);
		
			return self.methodss;
		},

		emit = function(){
			var args = Array.prototype.slice.call(arguments);
		
			socket.emit.apply(socket, args);
		
			return self.methodss;
		};
		
		self.methodss = {
			connect:connect,
			on:		on,
			emit:	emit
		};
	
		return self.methodss;
	})();
	
	return network;
});
