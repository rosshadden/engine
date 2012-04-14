define(function(){
	var self = this,
		socket,

	connect = function(){
		socket = io.connect('http://localhost');
	};

	return {
		connect:	connect
	};
});
