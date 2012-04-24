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
			engine.players.players[id] = {
				id:		id,
				socket:	socket
			};
			
			console.log('Player #%d connected.', ++engine.players.count);
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
		io.sockets.emit(event, data);
	},
	
	inRoom = function(room){
		return {
			emit:	function(event, data){
				engine.app.io.sockets.in(room).emit(event, data);
			},
			
			broadcast:	function(event, data){
				//	socket.broadcast.to(room).emit(event, data);
			}
		};
	},
	
	withPlayer = function(user){
		if(typeof user === 'string'){
			user = engine.players.get(user);
		}
		
		return {
			emit:	function(event, data){
				user.socket.emit(event, data);
			},
			
			broadcast:	function(event, data){
				user.socket.broadcast.emit(event, data);
			},
			
			broadcastTo:	function(room, event, data){
				user.socket.broadcast.to(room).emit(event, data);
			}
		};
	};
	
	return {
		on:		on,
		emit:	emit,
		'in':	inRoom,
		'with':	withPlayer
	};
};

module.exports = network;
