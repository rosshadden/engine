define([
	'./net'
], function(net){
	return function(engine){
		net(engine);
	};
});