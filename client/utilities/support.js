define(function(){
	/*
		The support component contains information about supported 
		functionality of the browser.

		//	returns true if canvas AND text is supported
		if(rage.support('canvas text')){
			//	supports
		}

		//	checks all arguments and returns first thing thats supported
		rage.support('ogg', 'aac', 'mp3', 'wav');

		//	find first supported storage storage
		rage.support('database', 'localstorage');

		this is helpful to find a supported codec or a storage component

		or add to entity

		rage.e('support').support('canvas');

		---- possible support checks
		canvas
		text
		audio
		ogg
		mp3
		wav
		aac
		localstorage
		worker
		webgl
	*/
	var support = function(s){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length > 1){
			//	find first supported arg and return
			var d;
			for(var i = 0; i < args.length; i++){
				d = args[i];
				
				if(support(d)){
					return d;
				}
			}

			return false;
		}

		//	find if supported
		var k = s.split(' '),
			stat = true;

		//	check multiple supports
		for(var j in k){
			stat = stat && !!support[k[j]];
		}

		return stat;
	};

	//	check canvas support
	support.canvas = !!document.createElement('canvas').getContext;

	//	check for text support
	support.text = !!(support.canvas && typeof document.createElement('canvas').getContext('2d').fillText === 'function');

	//	check audio support
	var element = document.createElement('audio');

	try{
		if(support.audio = !!element.canPlayType){
			support.ogg = element.canPlayType('audio/ogg; codecs="vorbis"');
			support.mp3 = element.canPlayType('audio/mpeg;');
			support.wav = element.canPlayType('audio/wav; codecs="1"');
			support.aac = element.canPlayType('audio/x-m4a;') || element.canPlayType('audio/aac;');

			//	switch unsupported codecs to false
			for(var i in support){
				if(support[i] === 'no' || support[i] === ''){
					support[i] = false;
				}
			}
		}
	}catch(e){}

	//	check local storage
	try{
		support.localstorage = !!localStorage.getItem;
	}catch(e){
		support.localstorage = false;
	}

	//	check web worker
	support.worker = !!window.Worker;

	//	check webgl
	support.webgl = !!window.WebGLRenderingContext;

	support.touch = 'ontouchstart' in window;
	
	return support;
});