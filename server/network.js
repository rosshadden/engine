var network = function(engine){
	engine.app.io = engine.app.io || require('socket.io').listen(app);
	
	var parseCookie = require('connect').utils.parseCookie,
		Session = require('connect').middleware.session.Session,
	
		emitter = engine.events.emitter,
		handlers = engine.events.handlers;
	
	engine.app.io.configure(function(){
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
	});
	
	engine.app.io.sockets.on('connection', function(socket){
		var self = this,
			id = socket.handshake.sessionID;

		if(!(id in engine.players.players)){
			engine.players.add(id, {
				socket:	socket
			});
			
			console.log('Player #%d connected.', ++engine.players.count);
		}else{
			engine.players.get(id).socket = socket;
			engine.players.get(id).rooms.forEach(function(room, r){
				socket.join(room);
			});
			
			console.log(id, 'rejoined rooms:', engine.players.get(id).rooms);
		}
		
		emitter.on('scope', function(f){
			f.call(self, socket);
		});
		
		for(var event in handlers){
			socket.on(event, handlers[event]);
		}
	});
	
	var on = function(event, handler){
		if(['scope'].indexOf(event) > -1){
			throw new Error("The event '" + event + "' is reserved by the engine.network module.");
		}
		
		handlers[event] = handler;
		emitter.emit('scope', function(socket){
			socket.on(event, handler);
		});
	},
	
	emit = function(event, data){
		engine.app.io.sockets.emit(event, data);
	},
	
	inRoom = function(room){
		var methods = {
			emit:	function(event, data){
				engine.app.io.sockets.in(room).emit(event, data);
				return methods;
			}
		};
		
		return methods;
	},
	
	withPlayer = function(user){
		if(typeof user === 'string'){
			user = engine.players.get(user);
		}
		
		var methods = {
			emit:	function(event, data){
				user.socket.emit(event, data);
				return methods;
			},
			
			broadcast:	function(event, data){
				user.socket.broadcast.emit(event, data);
				return methods;
			},
			
			broadcastTo:	function(room, event, data){
				user.socket.broadcast.to(room).emit(event, data);
				return methods;
			},

			join:	function(room){
				user.socket.join(room);
				
				if(user.rooms.indexOf(room) === -1){
					user.rooms.push(room);
				}
				
				return methods;
			},

			leave:	function(room){
				var index = user.rooms.indexOf(room);
				
				if('/' + room in engine.app.io.sockets.manager.roomClients[user.socket.id]){
					user.socket.leave(room);
				}
				
				if(index > -1){
					user.rooms.splice(index, 1);
				}
				
				return methods;
			}
		};

		return methods;
	};
	
	return {
		on:		on,
		emit:	emit,
		'in':	inRoom,
		'with':	withPlayer
	};
};

module.exports = network;
