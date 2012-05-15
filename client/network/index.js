define([
	'./ajax',
	'./sockets',
	'./net'
], function(ajax, sockets, net){
	'use strict';
	
	return function(Σ){
		net(Σ);
		
		Σ.network = ajax(Σ);
		Σ.network.sockets = sockets(Σ);
	};
});
