define(['./query', './component', './entity', './load', './system'], function(query, component, entity, load, system){
	var engine = function(selector){
		return new engine.query(selector);
	};
	
	engine.version = '0.0.1';
	
	engine._e = [];
	engine._c = {};
	
	engine.ready = function(handler){
		engine.listener('load', handler);
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
	
	engine.query = query(engine);
	component(engine);
	entity(engine);
	system(engine);
	load(engine);

	return engine;
});
