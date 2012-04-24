module.exports = (function(engine){
	var players = {},
		count = 0,

	get = function(id){
		return players[id];
	},
	
	add = function(id, data){
		players[id] = {
			id:		id,
			socket:	data.socket,
			rooms:	data.rooms || []
		};
	};

	return {
		players:players,
		count:	count,
		get:	get,
		add:	add
	};
})();
