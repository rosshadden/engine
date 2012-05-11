define([
	'./network',
	'./net'
], function(network, net){
	'use strict';
	
	return function(engine){
		engine.network = network(engine);
		net(engine);
	};
});
