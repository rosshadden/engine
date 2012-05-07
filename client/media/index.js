define([
	'./sound'
], function(sound){
	return function(engine){
		sound(engine);
	};
});