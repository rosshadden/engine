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
			
			response.json(map);
		}catch(e){
			console.log('Error: A client tried to access map "%s".', request.params.path);
			response.send('The map you seek does not exist.', 404);
		}
	}
};
