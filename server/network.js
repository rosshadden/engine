var network = function(engine){
	engine.app.io = engine.app.io || require('socket.io').listen(engine.app);
	
	var self = this,
		parseCookie = require('connect').utils.parseCookie,
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
			id = socket.handshake.sessionID,
			player = engine.players.get(id);

		if(!player){
			engine.players.add(id, {
				socket:	socket
			});
			
			player = engine.players.get(id);

			emitter.emit('created ' + id);
			
			console.log('Player #%d connected:  %s.', ++engine.players.count, id);
		}else{
			player.socket = socket;
			player.rooms.forEach(function(room, r){
				socket.join(room);
			});
		}
			
		player.events.emit('load');
		
		emitter.on('scope', function(f){
			f.call(self, socket);
		});
		
		for(var event in handlers){
			socket.on(event, handlers[event]);
		}
		
		socket.on('disconnect', function(){
			player.events.emit('unload');
		});
	});
	
	var on = function(event, handler){
		if(['scope'].indexOf(event) > -1){
			throw new Error("The event '" + event + "' is reserved by the engine.network module.");
		}
		
		handlers[event] = handler;
		emitter.emit('scope', function(socket){
			socket.on(event, handler);
		});
		
		return self.methods;
	},
	
	emit = function(event, data){
		engine.app.io.sockets.emit(event, data);
		
		return self.methods;
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
				//	I'll combine these two cases eventually.
				if(room instanceof RegExp){
					user.rooms = user.rooms.filter(function(channel, c){
						if(room.test(channel)){
							if('/' + channel in engine.app.io.sockets.manager.roomClients[user.socket.id]){
								user.socket.leave(channel);
							}
							
							return false;
						}
						
						return true;
					});
				}else{
					var index = user.rooms.indexOf(room);
					
					if(index > -1){
						user.rooms.splice(index, 1);
					}
					
					if('/' + room in engine.app.io.sockets.manager.roomClients[user.socket.id]){
						user.socket.leave(room);
					}
				}
				
				return methods;
			}
		};

		return methods;
	};
	
	self.methods = {
		on:		on,
		emit:	emit,
		'in':	inRoom,
		'with':	withPlayer
	};
	
	return self.methods;
};

module.exports = network;
