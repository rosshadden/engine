module.exports = {
	'/GET':	function(request, response){
		var data = '',
			url = parseURL(request.url, true);
	
		response.contentType('application/json');
	
		switch(url.query.for){
			case 'debug':
				data = 'debug';
				break;
			default:
				data = 'default';
		}
	
		response.json(data);
	},
	
	'/maps/:path':	function(request, response){
		try{
			var map = require('../resources/maps/' + request.params.path + '.json');
			
			response.contentType('application/json');
			
			response.json(map);
		}catch(e){
			response.statusCode = 404;
			
			response.end('The map you seek does not exist.');
		}
	}
};
