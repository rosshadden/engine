module.exports = (function(engine){
	var players = {},
		count = 0;

	var get = function(id){
		return players[id];
	};

	return {
		players:players,
		count:	count,
		get:	get
	};
})();
