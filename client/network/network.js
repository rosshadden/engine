define(['/socket.io/socket.io.js'], function(IO){
	'use strict';
	
	return function(engine){
		var network = (function(){
			var socket = io.connect().emit('connected'),

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
				on:		on,
				emit:	emit
			};
		})();
		
		return network;
	};
});
