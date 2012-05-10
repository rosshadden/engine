define(['/socket.io/socket.io.js'], function(IO){
	'use strict';
	
	return function(engine){
		engine.c('net')
		.defines({
			connect:function(path){
				this.socket = io.connect(path || '');
			},
			
			bind:		function(){
				var args = [].slice.call(arguments);
				
				this.socket.on.apply(this.socket, args);
				
				return this;
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				this.socket.emit.apply(this.socket, args);
				
				return this;
			}
		})
		.init(function(){
			this.connect();
		});
	};
});