define(function(){
	var self = this;

	var context = new webkitAudioContext(),
	
	get = function(name){
//		return resources.get(name, 'sound');
	},
	
	Sound = function(buffer){
		var self = this;
		
		self.play = function(t){
			//	Why do the next three lines have to be called every time?
			self.source = context.createBufferSource();
			self.source.buffer = buffer;
			self.source.connect(context.destination);
			self.source.noteOn(t || 0);
		};
	};
	
	return {
		context:	context,
		get:		get,
		Sound:		Sound
	};
});
