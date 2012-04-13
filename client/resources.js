define(function(){
	var resources = {},
	
	add = function(name, Type, path){
		var def = new $.Deferred;
		
		if(!resources[Type]){
			resources[Type] = {};
		}
		
		var item = resources[Type][name] = new Type;
		
		item.onload = function(){
			def.resolve();
		};
		
		item.src = path;
		
		return def.promise();
	},
	
	get = function(name, Type){
		return resources[Type][name];
	};
	
	return {
		add:	add,
		get:	get
	};
});
