define(['./query', './component', './entity', './load', './system'], function(query, component, entity, load, system){
	var rage = function(selector){
		return new rage.query(selector);
	};
	
	rage.version = '0.0.2';
	
	rage._e = [];
	rage._c = {};
	
	rage.ready = function(handler){
		rage.listener('load', handler);
	};
	
	rage.listener = function(event, handler, context){
		(context || window).addEventListener(event, handler, true);
	};
	
	rage.is = function(object, type){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length === 1){
			return !!object;
		}
		
		return typeof object === type || type === Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
	};
	
	rage.query = query(rage);
	component(rage);
	rage.entity = rage.e = entity(rage);
	system(rage);
	rage.load = load(rage);

	return rage;
});
