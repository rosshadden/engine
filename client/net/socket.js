define(['/socket.io/socket.io.js'], function(IO){
	return function(engine){
		engine.c('net')
		.defines({
			socket:	io.connect(),
			
			connect:function(path){
				this.socket = this.socket.connect(path);
			},
			
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
		.init(function(){
		});
	};
});