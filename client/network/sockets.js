define(['/socket.io/socket.io.js'], function(IO){
	'use strict';
	
	return function(Σ){
		var network = (function(){
			var socket = io.connect().emit('connected'),

			on = function(){
				var args = Array.prototype.slice.call(arguments);

				socket.on.apply(socket, args);

				return methods;
			},

			emit = function(){
				var args = Array.prototype.slice.call(arguments);

				socket.emit.apply(socket, args);

				return methods;
			},
				
			methods = {
				on:		on,
				emit:	emit
			};

			return methods;
		})();
		
		return network;
	};
});
