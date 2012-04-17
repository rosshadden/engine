var network = function(app){
	var	io = require('socket.io').listen(app),
	
	players = {},
	numPlayers = 0;
	
	io.sockets.on('connection', function(socket){
		players[socket.id] = {
			socket:	socket
		};
		
		console.log('Player #%d connected.', ++numPlayers);
	});
	
	return {
		io:			io,
		players:	players,
		numPlayers:	numPlayers
	};
};

module.exports = network;
