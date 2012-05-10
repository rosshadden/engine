define([
	'./storage'
], function(storage){
	'use strict';
	
	return function(engine){
		storage(engine);
	};
});