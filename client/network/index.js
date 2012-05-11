define([
	'./network',
	'./net'
], function(network, net){
	'use strict';
	
	return function(Σ){
		Σ.network = network(Σ);
		net(Σ);
	};
});
