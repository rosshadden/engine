define([
	'./storage'
], function(storage){
	return function(engine){
		storage(engine);
	};
});