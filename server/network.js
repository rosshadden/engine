var network = function(app){
	var	io = require('socket.io').listen(app),
	
	players = {},
	numPlayers = 0;
	
	io.set('log level', 1);
	
	var start = function(handler){
		io.sockets.on('connection', function(socket){
			players[socket.id] = {
				socket:	socket
			};
			
			console.log('Player #%d connected.', ++numPlayers);
			
			if(typeof handler === 'function'){
				handler.call(this, socket);
			}
		});
	};
	
	return {
		io:			io,
		players:	players,
		numPlayers:	numPlayers,
		start:		start
	};
};

module.exports = network;
