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
		
		/*
			Calls the given method name on all entities.
			
			engine('enemies').invoke('rest');
		*/
		methods.invoke = function(m){
			var args = Array.prototype.slice.call(arguments, 1);
			
			if(typeof m === 'string'){
				return this.each(function(entity){
					entity[m].apply(entity, args);
				});
			}else{
				_.invoke(this, m, args);
				return this;
			}
		};
		
		methods.each = function(m, context){
			_.each(this, m, context || this);
			
			return this;
		};
		
		/*
			The map method allows multidimensional loops.
			
			//map through and increase y every 3 entities.
			
			engine('draw').tilemap(3, function(e, x, y){
				e.x(x * width);
				e.y(Y * height);
			});
			
			//so instead of getting this back
			[e,e,e,e,e...]
			
			//you will get this
			[
			[e,e,e],
			[e,e,e],
			[e,e,e]
			...
			]
			
			returning false will break the loop
		*/
		methods.tilemap = function(w, method, context){
			var x = 0;
			var y = 0;
			
			return this.each(function(i, l){
				if(!method.call(context, this[i], x, y, i, this)){
					return false;
				}
				
				x++;
				
				if(x == w){
					x = 0;
					y++;    
				}
			});
		};
		
		//	Returns an array of all components in the query.
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
		
		//	Returns a random entity
		methods.random = function(){
			return this[(Math.random() * this.length) | 0];
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
		
		/*
			The pluck method returns all values from all entities in an array.
			
			//will return all pos objs from all entities.
			engine('point').pluck('pos visible');
			
			//if we print...
			
			[
			{pos:0, visible:0}
			...
			]
		*/
		methods.pluck = function(value){
			return _.pluck(this, value);
		};
		
		methods.isEmpty = function(){
			return !this.length;
		};
		
		/*
			Returns the first entity that passes the truth iterator method.
			
			engine('tile').find(function(e){
			  return e.tileX() == 0 && e.tileY() == 1;
			});
		*/
		methods.find = function(method, context){
			for(var i = 0, l = this.length; i < l; i++){
				if(method.call(context || this, this[i], i, this)){
					return this[i];
				}
			}
			
			return null;
		};
		
		/*
			Returns the lowest entity from the given iterator.
			
			var weakestRat = engine('rat').min(function(e){
			  return e.health;
			});
		*/
		methods.min = function(method, context){
			var val,
				lowest = Infinity;
			this.each(function(e, i, l){
				var next = method.call(context || this, e, i, l);
				
				if(next < lowest){
					lowest = next;
					val = e;
				}
				
			});
			
			return val;
		};
		
		methods.max = function(method, context){
			var val,
				lowest = -Infinity;
			this.each(function(e, i, l){
				var next = method.call(context || this, e, i, l);
				
				if(next > lowest){
					lowest = next;
					val = e;
				}
			});
			
			return val;
		};
		
		//	Without this, filter would return a normal array.
		methods.filter = function(){
			var args = [].slice.call(arguments);
			return engine(Array.prototype.filter.apply(this, args));
		};
		
		/*
			Finds first entity with components
			
			engine('draw').findWith('circle !red');
		*/
		methods.findWith = function(comps, c){
			return this.find(function(e){
				return e.has(comps);
			}, c);
		};
		
		//	Creates a new entity and pushes it into the collection.
		methods.e = function(components, count){
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
		
		methods.include = function(ref){
			return this.indexOf(ref) !== -1;
		};
		
		/*
			Removes first reference found from array.
			
			var blah = engine.e();
			
			var q = engine()
			q.push(blah);
			
			q.erase(blah);
			
			q.include(blah) //false
			
			Can also add in other in its place.
			
			q.erase(blah, engine.e());
		*/
		methods.erase = function(ref){
			for(var i = this.length; i--;){
				if(this[i] == ref){
					this.splice(i, 1);
				}
			}
			return this;
		};
		
		//	Inserts an element after the other.
		methods.insertAfter = function(target, ref){
			this.splice(this.indexOf(target) + 1, 0, ref);
			return this;
		};
		
		//	Inserts an element before the other.
		methods.insertBefore = function(target, ref){
			this.splice(this.indexOf(target), 0, ref);
			return this;
		};
		
		//	Swaps the indexes of the given elements.
		methods.swap = function(ref1, ref2){
			var ref1i = this.indexOf(ref1),
				ref2i = this.indexOf(ref2);
			
			var t = this[ref1i];
			this[ref1i] = ref2;
			this[ref2i] = t;
			
			return this;
		};
		
		methods.dispose = function(){
			return this.each(function(entity){
				entity.dispose();
			});
		};
		
		/*
			returns first element or appends it to front
			
			engine().first(1).first(); //1
		*/
		methods.first = function(r){
			var args = [].slice.call(arguments);
			
			if(args.length){
				this.unshift.apply(this, args);
				return this;
			}
			return this[0];
		};
		
		methods.last = function(ref){
			var args = [].slice.call(arguments);
			
			if(args.length){
				this.push.apply(this, args);
				return this;
			}
			return this[this.length - 1];
		};
		
		return query;
	};
});
