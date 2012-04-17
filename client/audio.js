define(['engine/resources'], function(resources){
	var self = this;

	var context = new webkitAudioContext(),
	
	get = function(name){
		//TODO:	Circular depencancy === fail.
		//return resources.get(name, 'sound');
	},
	
	Sound = function(buffer){
		var self = this;
		
		self.source = context.createBufferSource();
		self.gainNode = context.createGainNode();
		
		self.play = function(t){
			self.source.buffer = buffer;
			
			self.source.connect(self.gainNode);
			self.gainNode.connect(context.destination);
			
			self.source.noteOn(t || 0);
			
			return self;
		};
		
		self.stop = function(t){
			self.source.noteOff(t || 0);
			
			return self;
		};
		
		self.setVolume = function(level){
			self.gainNode.gain.value = level;
			
			return self;
		};
	};
	
	return {
		context:	context,
		get:		get,
		Sound:		Sound
	};
});
