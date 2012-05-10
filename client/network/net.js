define(['/socket.io/socket.io.js'], function(IO){
	'use strict';
	
	return function(engine){
		engine.c('net')
		.namespaces({
			on:		function(){
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
		.defines({
			connect:function(path){
				this.socket = io.connect(path || '');
			},
			
			bind:		function(){
				var args = [].slice.call(arguments);
				
				return this.net_on.apply(this, args);
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				return this.net_emit.apply(this, args);
			}
		})
		.init(function(){
			this.connect();
		});
	};
});