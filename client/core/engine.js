define([
	'./query',
	'./component',
	'./entity',
	'./load',
	'./system'
], function(query, component, entity, load, system){
	var engine = function(selector){
		return new engine.query(selector);
	};
	
	engine.version = '0.0.2';
	
	engine._e = [];
	engine._c = {};
	
	engine.ready = function(handler){
		engine.listener('load', handler);
	};
	
	//	For selecting IDs and tags.
	engine.$ = function(selector){
		return engine.$._[selector] = engine.$._[selector] || ((selector.charAt(0) === '#') ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector)[0]);
	};
	
	//	Cache of DOM queries.
	engine.$._ = {};
	
	engine.$new = function(element){
		return document.createElement(element);
	};
	
	engine.listener = function(event, handler, context){
		(context || window).addEventListener(event, handler, true);
	};
	
	engine.is = function(object, type){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length === 1){
			//return typeof object !== 'undefined';
			return object != null;
		}
		
		return typeof object === type || type === Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
	};
	
	engine.query = query(engine);
	component(engine);
	engine.entity = engine.e = entity(engine);
	system(engine);
	engine.load = load(engine);

	return engine;
});
