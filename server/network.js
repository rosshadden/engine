var network = function(app){
	app.io = app.io || require('socket.io').listen(app),
	emitter = new (require('events').EventEmitter),
	parseCookie = require('connect').utils.parseCookie,

	//TODO:	Break events out into their own module.
	events = {},

	//TODO:	Break players out into their own module.
	players = {},
	numPlayers = 0;

	app.io.set('authorization', function(data, accept){
		if(data.headers.cookie){
		    data.cookie = parseCookie(data.headers.cookie);

		    data.sessionID = data.cookie['connect.sid'];
		}else{
		   return accept('No cookie transmitted.', false);
		}
		
		accept(null, true);
	});
	
	app.io.sockets.on('connection', function(socket){
		var id = socket.handshake.sessionID;
		
		if(!(id in players)){
			players[id] = {
				id:		id,
				socket:	socket
			};
			
			console.log('Player #%d connected.', ++numPlayers);
		}
		
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
	
	emit = function(user, event, data){
		var timeout;
		
		if(players[user] && players[user].isOnline){
			players[user].socket.emit(event, data);
		}else{
			emitter.on('login', function(socket){
				//	If userThatJustLoggedIn === user,
				//	emit the event for them,
				//	destroy the listener,
				//	and destroy the timeout.
			});

			timeout = setTimeout(function(){
				//	After ten (or so) seconds, remove the event.
				//	Clearly the user isn't logging in any time soon.
			}, 1e10);
		}
	},

	emitAll = function(event, data){
		emitter.emit('trigger', event, data);
	};
	
	return {
		players:	players,
		numPlayers:	numPlayers,
		on:			on,
		emit:		emit,
		emitAll:	emitAll
	};
};

module.exports = network;
