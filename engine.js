var engine = function(app){
	var router = require('./server/router'),
		network = require('./server/network')(app);
	
	// for(var route in router){
		// console.log('router: [%s]', route);
		// app.get(route, router[route]);
	// }
	
	return {
		network:	network
	};
};

module.exports = engine;
