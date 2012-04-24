define(function(){
	var network = (function(){
		var self = {},
			socket,

		connect = function(path){
			socket = io.connect(path);
		
			return self.methods;
		},

		on = function(){
			var args = Array.prototype.slice.call(arguments);
		
			socket.on.apply(socket, args);
		
			return self.methods;
		},

		emit = function(){
			var args = Array.prototype.slice.call(arguments);
		
			socket.emit.apply(socket, args);
		
			return self.methods;
		};
		
		return self.methods = {
			connect:connect,
			on:		on,
			emit:	emit
		};
	})();
	
	return network;
});
