var network = function(socket){
	socket.on('testing', function(){
		console.log('testing');
	});
};

module.exports = network;
