module.exports = {
	'/engine/*':	function(request, response, next){
		next();
	},
	
	'/maps/:path':	function(request, response){
		try{
			var map = require('../../resources/maps/' + request.params.path + '.json');
			
			response.json(map);
		}catch(e){
			console.log('Error: A client tried to access map "%s".', request.params.path);
			response.send('The map you seek does not exist.', 404);
		}
	}
};
