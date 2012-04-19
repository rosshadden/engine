var network = function(app){
	app.io = app.io || require('socket.io').listen(app),
	
	players = {},
	numPlayers = 0;
	
	var start = function(handler){
		app.io.sockets.on('connection', function(socket){
			console.log(socket.id, players);
			if(!(socket.id in players)){
				players[socket.id] = {
					id:		socket.id,
					socket:	socket
				};
				
				console.log('Player #%d connected.', ++numPlayers);
			}
			
			if(typeof handler === 'function'){
				handler.call(this, socket);
			}
		});
	};
	
	return {
		io:			app.io,
		players:	players,
		numPlayers:	numPlayers,
		start:		start
	};
};

module.exports = network;
