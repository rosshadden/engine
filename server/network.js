var network = function(engine){
	engine.app.io = engine.app.io || require('socket.io').listen(app);
	
	var parseCookie = require('connect').utils.parseCookie,
		Session = require('connect').middleware.session.Session,
	
		emitter = engine.events.emitter,
		handlers = engine.events.handlers,

		//TODO:	Break players out into their own module.
		players = {},
		numPlayers = 0;

	engine.app.io.set('authorization', function(data, accept){
		if(data.headers.cookie){
		    data.cookie = parseCookie(data.headers.cookie);
		    
		    data.sessionID = data.cookie.engine.split('.')[0];

			data.sessionStore = engine.app.session;
			engine.app.session.load(data.sessionID, function(err, session){
				if(err || !session){
					accept('Error', false);
				}else{
					data.session = new Session(data, session);
					accept(null, true);
				}
			});
		}else{
			return accept('No cookie transmitted.', false);
		}
	});
	
	engine.app.io.sockets.on('connection', function(socket){
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
		
		for(var event in handlers){
			socket.on(event, handlers[event]);
		}
	});
	
	var on = function(event, handler){
		if(['bind', 'trigger'].indexOf(event) > -1){
			throw new Error("The event '" + event + "' is reserved by the engine.network module.");
		}
		
		handlers[event] = handler;
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
