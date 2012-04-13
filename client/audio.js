define(['engine/resources'], function(resources){
	var self = this;

	var buffers = {},
		context = new webkitAudioContext();

	var load = function(name, url){
		var def = new $.Deferred,
			request = new XMLHttpRequest();

		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		request.onload = function(){
			context.decodeAudioData(request.response, function(soundBuffer){
				buffers[name] = soundBuffer;
			});
			
			def.resolve(buffers[name]);
		};

		request.send();
		
		return def.promise();
	};

	var play = function(name){
		var source = context.createBufferSource();

		source.buffer = buffers[name];
		source.connect(context.destination);
		source.noteOn(0);
	};
	
	return {
		load:		load,
		play:		play
	};
});
