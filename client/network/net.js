define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('net')
		.namespaces({
			on:		function(){
				var args = [].slice.call(arguments);
				
				Σ.network.sockets.on.apply(this, args);
				
				return this;
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				Σ.network.sockets.emit.apply(this, args);
				
				return this;
			}
		})
		.defines({
			bind:		function(){
				var args = [].slice.call(arguments);
				
				return this.net.on.apply(this, args);
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				return this.net.emit.apply(this, args);
			}
		});
	};
});
