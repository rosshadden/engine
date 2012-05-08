define([
	'./socket'
], function(socket){
	return function(engine){
		socket(engine);
	};
});