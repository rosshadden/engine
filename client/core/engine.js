define([
	'./query',
	'./component',
	'./entity',
	'./load',
	'./system'
], function(query, component, entity, load, system){
	'use strict';
	
	var Σ = function(selector){
		return new Σ.query(selector);
	};
	
	Σ.version = '0.0.2';
	
	Σ._e = [];
	Σ._c = {};
	
	Σ.ready = function(handler){
		Σ.listener('load', handler);
	};
	
	//	For selecting IDs and tags.
	Σ.$ = function(selector){
		return Σ.$._[selector] = Σ.$._[selector] || ((selector.charAt(0) === '#') ? document.getElementById(selector.substr(1)) : document.getElementsByTagName(selector)[0]);
	};
	
	//	Cache of DOM queries.
	Σ.$._ = {};
	
	Σ.$new = function(element){
		return document.createElement(element);
	};
	
	Σ.listener = function(event, handler, context){
		(context || window).addEventListener(event, handler, true);
	};
	
	Σ.is = function(object, type){
		var args = Array.prototype.slice.call(arguments);
		
		if(args.length === 1){
			//return typeof object !== 'undefined';
			return object != null;
		}
		
		return typeof object === type || type === Object.prototype.toString.call(object).slice(8, -1).toLowerCase();
	};
	
	Σ.query = query(Σ);
	component(Σ);
	Σ.entity = Σ.e = entity(Σ);
	system(Σ);
	Σ.load = load(Σ);

	return Σ;
});
