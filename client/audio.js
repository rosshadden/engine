define(['engine/lib/sound'], function(Sound){
	var self = this;

	var buffer,
		context = new webkitAudioContext();

	var load = function(url){
		var request = new XMLHttpRequest();

		request.open('GET', url, true);
		request.responseType = 'arraybuffer';

		request.onload = function(){
			context.decodeAudioData(request.response, function(soundBuffer){
				buffer = soundBuffer;
			});
		};

		request.send();
	};

	var play = function(){
		var source = context.createBufferSource();

		source.buffer = buffer;
		source.connect(context.destination);
		source.noteOn(0);
	};
	
	return {
		context:	context,
		load:		load,
		play:		play,
		Sound:		Sound
	};
});
