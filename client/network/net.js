define(function(){
	'use strict';
	
	return function(Σ){
		Σ.c('net')
		.namespaces({
			on:		function(){
				var args = [].slice.call(arguments);
				
				Σ.network.on.apply(this, args);
				
				return this;
			},
			
			emit:	function(){
				var args = [].slice.call(arguments);
				
				Σ.network.emit.apply(this, args);
				
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
