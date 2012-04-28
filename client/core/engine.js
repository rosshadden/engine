define(['./query'], function(query){
	var engine = function(selector){
		return new engine.query(selector);
	};
	
	engine.query = query(engine);
	
	engine.version = '0.0.1';
	
	engine._entities = [];
	engine._modules = {};
	
	engine.ready = function(handler){
		engine.listener('load', hanlder);
	};
	
	engine.listener = function(event, handler, context){
		(context || window).addEventListener(event, handler, true);
	};
	
	engine.is = function(object, type){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length === 1){
			return !!object;
		}
		
		return typeof object === type || type === Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
	};

	return engine;
});
