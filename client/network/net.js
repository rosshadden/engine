define(function(){
	'use strict';
	
	return function(engine){
		engine.c('net')
		.namespaces({
			on:		function(){
				var args = [].slice.call(arguments);
				
				engine.network.on.apply(this, args);
				
				return this;
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				engine.network.emit.apply(this, args);
				
				return this;
			}
		})
		.defines({
			bind:		function(){
				var args = [].slice.call(arguments);
				
				return this.net_on.apply(this, args);
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				return this.net_emit.apply(this, args);
			}
		});
	};
});
