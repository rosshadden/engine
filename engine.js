var engine = function(app){
	var router = require('./server/router'),
		events = require('./server/events'),
		network = require('./server/network'),
		players = require('./server/players');
	
	// for(var route in router){
		// console.log('router: [%s]', route);
		// app.get(route, router[route]);
	// }
	
	return {
		router:		router,
		events:		events,
		network:	network({
			app:	app,
			events:	events
		}),
		players:	players({
			events:	events,
			network:network
		})
	};
};

module.exports = engine;
