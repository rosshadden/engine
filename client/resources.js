define(['engine/audio'], function(audio){
	var resources = {},
	
	add = function(name, path){
		var def = new $.Deferred,
			type, item;
		
		if(/\.png$|\.jpg$|\.gif/.test(path)){
			type = 'image';
		}else if(/\.wav$|\.mpg$|\.ogg/.test(path)){
			type = 'sound';
		}
		
		if(!resources[type]){
			resources[type] = {};
		}
		
		switch(type){
			case 'image':
				item = new Image;
				
				item.src = path;
				
				item.onload = function(){
					def.resolve(item);
				};
				
				break;
			case 'sound':
				var request = new XMLHttpRequest;

				request.open('GET', path, true);
				request.responseType = 'arraybuffer';

				request.onload = function(){
					audio.context.decodeAudioData(request.response, function(buffer){
						item = new audio.Sound(buffer);
						
						def.resolve(item);
					});
				};

				request.send();
				
				break;
		}
		
		return def.promise().done(function(){
			resources[type][name] = item;
		});
	},
	
	get = function(name, type){
		if(typeof type === 'undefined' && name.indexOf('/') >= 0){
			var path = name.split('/'),
				type = path[0];
				name = path[1];
		}
		
		return resources[type][name];
	};
	
	return {
		add:	add,
		get:	get
	};
});
