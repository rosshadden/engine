module.exports = (function(engine){
	var players = {},
		count = 0
		Emitter = require('events').EventEmitter,

	get = function(id){
		return players[id];
	},
	
	add = function(id, data){
		players[id] = {
			id:		id,
			socket:	data.socket,
			rooms:	data.rooms || [],
			events:	new Emitter
		};
	};
	
	//	Currently mapping directly,
	//	but these should be wrapped and return methods
	//	to maintain the (currently nonexistent) chain.

	return {
		players:players,
		count:	count,
		get:	get,
		add:	add
	};
})();
