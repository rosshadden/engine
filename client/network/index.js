define([
	'./net'
], function(net){
	'use strict';
	
	return function(engine){
		net(engine);
	};
});