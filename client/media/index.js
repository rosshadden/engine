define([
	'./sound'
], function(sound){
	'use strict';
	
	return function(engine){
		sound(engine);
	};
});