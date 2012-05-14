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
			
			get = function(url, callback){
				var xhr = new XMLHttpRequest;
				
				xhr.onreadystatechange = function(){
					var response;
					
					callback = callback || function(){};
					
					if(xhr.readyState === 4){
						if(xhr.status === 200){
							try{
								response = JSON.parse(xhr.responseText);
							}catch(e){
								response = xhr.responseText;
							}
							
							callback.call(this, response);
						}else{
							callback.call(this, response);
						}
					}
				};
				
				xhr.open('GET', (url || '/'), true);
				xhr.send(null);
				
				return methods;
			},
				
			methods = {
				on:		on,
				emit:	emit,
				get:	get
			};

			return methods;
		})();
		
		return network;
	};
});
