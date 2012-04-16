var engine = function(app){
	var router = require('./router'),
		network = require('./network');
	
	for(var route in router){
		app.get(route, router[route]);
	}
	
	return {
		network:	network
	};
};

module.exports = engine;
