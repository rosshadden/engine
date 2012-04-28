define(function(){
	return function(engine){
		var q = function(selector){
			this.query(selector);
		};
	
		q._toObj = function(query){
			if(q.c[query]){
				//TODO:	return [q.c[query]];, or whatever keeps it as an 'array'.
				return q.c[query];
			}
		
			var temp = query.split(' '),
				id = '',
				comps = [],
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
					comps.push(temp[j]);
				}
			}
		
			return q.c[query] = {
				id:			id,
				comp:		comps,
				on:			events,
				not:		except
			};
		};
	
		q.c = {};
	
		var p = q.prototype = new Array;
	
		p.query = function(select){
			select = select || '';
		
			var entity,
				length = engine._entities.length,
				i = -1;
			
			if(engine.is(select, 'string')){
				if(select === '*'){
					this.push.apply(this, engine._entities.slice());
					
					return this;
				}
				
				var object = q._toObj(select);
				while(++i < length && (entity = engine._entities[i])){
					if(entity.has(object)){
						this.push(entity);
					}
				}
			}else if(engine.is(select, 'function')){
				while(++i < length && (entity = engine._entities[i])){
					if(select.call(entity, i, length)){
						this.push(entity);
					}
				}
			}else if(engine.is(select, 'array')){
				this.push.apply(this, select);
			}
			
			p.invoke = function(method){
				var args = Array.prototype.slice.call(arguments, 1);
				
				return this.each(function(entity){
					entity[method].apply(entity, args);
				});
			};
			
			p.each = function(method, context){
				var entity,
					length = this.length,
					i = -length;
				
				while(++i < length && !!(entity = this[i]) && !!method.call(context || this, entity, i, this))
				
				return this;
			};
			
			p.comps = function(){
				var l = [];
				
				this.each(function(entity){
					var i,
						entity = entity.comps();
					for(i = 0; i < entity.length; i++){
						if(l.indexOf(entity[i]) === -1){
							l.push(entityc[i]);
						}
					}
				});
				
				return l;
			};
			
			p.attr = function(object, value){
				return this.invoke('attr', object, value);
			};
			
			p.def = function(object, value){
				return this.invoke('def', object, value);
			};
			
			p.comp = function(c){
				return this.invoke('component', c);
			};
			
			p.on = function(event, method){
				return this.invoke('on', event, method);
			};
			
			p.off = function(event, method){
				return this.invoke('off', event, method);
			};
			
			p.trigger = function(){
				var args = Array.prototype.slice.call(arguments);
				return this.each(function(entity){
					entity.trigger.apply(entity, args);
				});
			};
			
			p.has = function(component){
				if(!this.length){
					return false;
				}
				
				return this.every(function(entity){
					return entity.has(component);
				});
			};
			
			p.entity = function(c, count){
				var entity = engine.entity(c, count);
				
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
	
		return q;
	};
});
