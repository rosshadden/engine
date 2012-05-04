define(function(){
	return function(engine){
		var query = function(selector){
			this.query(selector);
		}
		
		query._toObj = function(search){
			if(query.c[search]){
				return query.c[search];
			}
			
			//convert to object
			var temp = search.split(' '),
				id = '',
				comps = [],
				events = [],
				minus = [];
			
			//split string
			var j, fl, value;
			for(j = temp.length; j--;){
				fl = temp[j].charAt(0);
				value = temp[j].substr(1);
				
				if(fl === '^'){
			 		events.push(value);
				}else if(fl === '!'){
			 		minus.push(value);
				}else if(fl === '#'){
			 		id = value;
				}else{
			 		comps.push(temp[j]);
				}
			}
			
			return query.c[search] = {
				id:		id,
				comp:	comps,
				on:		events,
				not:	minus
			};
		}
		
		query.c = {};
		
		var methods = query.prototype = new Array;
		
		methods.query = function(select){
			select = select || '';
			
			var entity,
				i = -1,
				length = engine._e.length;
			
			if(engine.is(select, 'string')){
				if(select === '*'){
			 		this.push.apply(this, engine._e.slice());
			 		
			 		return this;
				}
				
				//optimize search and cache
				var obj = query._toObj(select);
				
				while(++i < length && (entity = engine._e[i])){
			 		if(entity.has(obj)){
						this.push(entity);
					}
				}
			}else if(engine.is(select, 'function')){
				while(++i < length && (entity = engine._e[i])){
					if(select.call(entity, i, length)){
						this.push(entity);
					}
				}
			}else if(engine.is(select, 'array')){
				this.push.apply(this, select);
			}
			
			return this;
		};
		
		methods.invoke = function(m){
			var args = Array.prototype.slice.call(arguments, 1);
			
			return this.each(function(entity){
				entity[m].apply(entity, args);
			});
			
		};
		
		methods.each = function(m, context){
		  var length = this.length, i = -1, entity;
		  
		  while(++i < length && (entity = this[i]) != null && m.call(context || this, entity, i, this) !== false);
			
		  return this;
		};
		
		methods.comps = function(){
			var list = [];
			
			this.each(function(entity){
				var k = entity.comps();
				for(var i = 0; i < k.length; i++){
					if(!~list.indexOf(k[i])){
						list.push(k[i])
					}
				}
			});
			
			return list;
		};
		
		methods.attr = function(obj, value){
			return this.invoke('attr', obj, value);
		}
		
		methods.def = function(obj, value){
			return this.invoke('def', obj, value);
		}
		
		methods.comp = function(c){
			return this.invoke('comp', c);
		}
		
		methods.removeComp = function(c){
			return this.invoke('removeComp', c);
		};
		
		methods.on = function(event, method){
			return this.invoke('on', event, method);
		};
		
		methods.off = function(event, method){
			return this.invoke('off', event, method);
		};
		
		methods.trigger = function(){
			var args = Array.prototype.slice.call(arguments);
			
			return this.each(function(entity){
				entity.trigger.apply(entity, args);
			});
		};
		
		methods.has = function(component){
			//	return false if empty
			if(!this.length){
				return false;
			}
			
			return this.every(function(entity){
				return entity.has(component);
			});
		};
		
		methods.entity = function(components, count){
			var entity = engine.entity(components, count);
			
			if(count){
				for(var i in entity){
					this.push(entity[i]);
				}
			}else{
				this.push(entity);
			}

			return this;
		};
		
		return query;
	};
});
