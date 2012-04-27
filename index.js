var engine = function(app){
	var router = require('./server/router'),
		events = require('./server/events'),
		players = require('./server/players'),
		network = require('./server/network')({
			app:	app,
			events:	events,
			players:players
		});
	
	// for(var route in router){
		// console.log('router: [%s]', route);
		// app.get(route, router[route]);
	// }
	
	return {
		router:		router,
		events:		events,
		network:	network,
		players:	players
	};
};

module.exports = engine;
