define([
	'./storage'
], function(storage){
	'use strict';
	
	return function(Σ){
		storage(Σ);
	};
});