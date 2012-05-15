define(['/socket.io/socket.io.js'], function(IO){
	'use strict';
	
	return function(Σ){
		var network = (function(){
			var ajax = function(type, url, callback){
				var xhr = new XMLHttpRequest,
					def = new Σ.utilities.Promise();
				
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
							
							def.resolve(response);
						}else{
							callback.call(this, response);
							
							def.reject(response);
						}
					}
				};
				
				xhr.open(type, (url || '/'), true);
				xhr.send(null);
				
				return def;
			},
			
			get = function(url, callback){
				return ajax('GET', url, callback);
			},
			
			post = function(url, callback){
				return ajax('POST', url, callback);
			},
				
			methods = {
				ajax:	ajax,
				get:	get,
				post:	post
			};

			return methods;
		})();
		
		return network;
	};
});
