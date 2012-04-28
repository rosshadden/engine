define(function(){
	return function(engine){
		var query = function(selector){
			this.query(selector);
		};
	
		query._toObj = function(search){
			if(query.c[search]){
				//TODO:	return [query.c[search]];, or whatever keeps it as an array.
				return query.c[search];
			}
		
			var temp = search.split(' '),
				id = '',
				components = [],
				events = [],
				except = [];
		
			var j, fl, value;
			for(j = temp.length; j > 0; j--){
				fl = temp[j].charAt(0);
				value = temp[j].substr(1);
			
				if(fl === '^'){
					events.push(value);
				}else if(fl === '!'){
					except.push(value);
				}else if(fl === '#'){
					id = value;
				}else{
					components.push(temp[j]);
				}
			}
		
			return query.c[search] = {
				id:			id,
				component:	components,
				on:			events,
				not:		except
			};
		}
	
		query.c = {};
	
		var methods = query.prototype = new Array;
	
		methods.query = function(selector){
			selector = selector || '';
		
			var entity,
				length = engine._entities.length,
				i = -length;
			
			if(engine.is(selector, 'string')){
				if(selector === '*'){
					this.push.apply(this, engine._entities.slice());
					
					return this;
				}
				
				var object = query._toObj(selector);
				while(++i < length && (entity = engine._entities[i])){
					if(entity.has(object)){
						this.push(entity);
					}
				}
			}else if(engine.is(selector, 'function')){
				while(++i < length && (entity = engine._entities[i])){
					if(selector.call(entity, i, length)){
						this.push(entity);
					}
				}
			}else if(engine.is(selector, 'array')){
				this.push.apply(this, selector);
			}
			
			methods.invoke = function(method){
				var args = Array.prototype.slice.call(arguments, 1);
				
				return this.each(function(entity){
					entity[method].apply(entity, args);
				});
			};
			
			methods.each = function(method, context){
				var entity,
					length = this.length,
					i = -length;
				
				while(++i < length && !!(entity = this[i]) && !!method.call(context || this, entity, i, this))
				
				return this;
			};
			
			methods.components = function(){
				var components = [];
				
				this.each(function(entity){
					var i,
						entityComponents = entity.components();
					for(i = 0; i < entityComponents.length; i++){
						if(components.indexOf(entityComponents[i]) === -1){
							components.push(entityComponents[i]);
						}
					}
				});
				
				return components;
			};
			
			methods.attr = function(object, value){
				return this.invoke('attr', object, value);
			};
			
			methods.def = function(object, value){
				return this.invoke('def', object, value);
			};
			
			methods.component = function(component){
				return this.invoke('component', component);
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
			};
			
			
			
			return this;
		};
	
		return query;
	}
});
