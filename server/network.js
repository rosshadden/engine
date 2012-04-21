var network = function(app){
	app.io = app.io || require('socket.io').listen(app),
	emitter = new (require('events').EventEmitter),
	q = require('q'),
	
	events = {},
	players = {},
	numPlayers = 0;
	
	app.io.sockets.on('connection', function(socket){
		/*if(!(socket.id in players)){
			players[socket.id] = {
				id:		socket.id,
				socket:	socket
			};
			
			console.log('Player #%d connected.', ++numPlayers);
		}*/
		
		emitter.on('bind', function(event, handler){
			socket.on(event, handler);
		});
		
		emitter.on('trigger', function(event, data){
			socket.emit(event, data);
		});
		
		for(var event in events){
			socket.on(event, events[event]);
		}
	});
	
	var on = function(event, handler){
		if(['bind', 'trigger'].indexOf(event) > -1){
			throw new Error("The event '" + event + "' is reserved by the engine.network module.");
		}
		
		events[event] = handler;
		emitter.emit('bind', event, handler);
	},
	
	emit = function(event, data){
		emitter.emit('trigger', event, data);
	};
	
	return {
		players:	players,
		numPlayers:	numPlayers,
		on:			on,
		emit:		emit
	};
};

module.exports = network;
