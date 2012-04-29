define(function(){
	return function(engine){
		//	Quick way to convert sentences to arrays.
		var __toArray = function(n, r){
			this._checkFinal();
			
			if(!this[n]){
			    this[n] = [];
			}
			
			if(engine.is(r, 'string')){
			    this[n] = this[n].concat(r.split(' '));
			}else{
			    this[n] = this[n].concat(r);
			}
			
			return this;
		};
	
		engine.comp = engine.c = function(title){
			if(!engine._c[title]){
			    engine._c[title] = new engine.c.init(title);
			}
			
			return engine._c[title];
		};
	
		engine.c.init = function(name){
			this.name = name;
			this._re_signals = {};
			this._re_inherits = {};
			this._re_defines = {};
			this._re_events = {};
			this._re_final = false;
		};
	
		engine.c.init.prototype = {
			_checkFinal:function(){
				if(this._re_final){
				    throw this.name+' is final.';
				}
			},
		
			statics:function(obj, value){
				this._checkFinal();
				
				if(!engine.is(value)){
				    for(var type in obj){
				        this[type] = obj[type];    
				    }
				}else{
				    this[obj] = value;    
				}
				
				return this;
			},
		
			events:function(obj, value){
			  this._checkFinal();
			  
			  if(!engine.is(value)){
				  for(var type in obj){
				      this._re_events[type] = obj[type];    
				  }
			  }else{
				  this._re_events[obj] = value;    
			  }
			  
			  return this;
			},
		
			requires:function(r){
				return __toArray.call(this, '_re_requires', r);
			},
		
			/*
			Upon component init it will throw an error 
			if one of the listed components exist.
		
			This prevents incompatible components from colliding.
			*/
			asserts:function(r){
				return __toArray.call(this, '_re_asserts', r);
			},
		
			/*
			The implement method checks and enforces implmentation
			of the given keys. This can create interface components
			for organization and query searches.
		
			Forcing an interface on components will allow instant
			runtime errors and save time.
		
			//reccommended to put an i infront to represent an interface
			engine.c('ienemy')
			//create an enemy interface
			.interface('moveTo spawn attack runAway');
		
			*/
			interfaces:function(r){
				return __toArray.call(this, '_re_implements', r);
			},
		
			/*
			Creates new names for a component.
		
			//create a new alias of draw
			engine.c('draw')
			.alias('bob');
		
			//remove alias
			engine.c('draw')
			.alias('-bob');
		
			//aliases can even delete components itself
			engine.c('draw').alias('-draw');
		
			//add two aliases
			engine.c('draw').alias('dr bob');
		
			*/
			alias:function(s){
				this._checkFinal();
				
				var p = s.split(' ');
				
				if(p.length > 1){
				    for(var i in p){
				        this.alias(p[i]);    
				    }
				    
				    return this;    
				}
				
				if(s.charAt(0) == '-'){
				    //only remove if its a reference
				    if(engine._c[s.substr(1)] == this){
				        delete engine._c[s.substr(1)];
				    }
				}else{
				    engine._c[s] = this;
				}
				
				return this;
			},
		
			/*
			Adds bind functionality to components.
			All components will automatically call two signals, init and dispose.
		
			Init on entity creation and dispose on entitiy disposition.
		
			This is useful for 'watch tower' components that keep a list of
			all entities that have its component. Check the cycle directory.
		
			*/
			on:function(){
				return engine.e.init.prototype.on.apply(this, arguments);
			},
		
			off:function(){
				return engine.e.init.prototype.off.apply(this, arguments);
			},
		
			trigger:function(){
			  return engine.e.init.prototype.trigger.apply(this, arguments);
			},
		
			/*
			Default adds onto but doesn't overwrite values.
			*/
			defaults:function(d, value){
				this._checkFinal();
				
				if(arguments.length == 1){
				    for(var k in d){
				        this._re_inherits[k] = d[k];    
				    }
				}else{
				    this._re_inherits[d] = value;
				}
				
				return this;
			},
		
			/*
			The namespace method is used to put private component variables
			in its own space. This prevents unwanted overrites.
		
			engine.c('draw')
			.namespace({
				pos:0,
				type:'none'
			});
		
			//or
			engine.c('draw')
			.namespace("pos", 0);
		
			//Will cast to 
			this.draw_pos = 10;
			this.draw_type = 'none';
		
			*/
			namespaces:function(obj, value){
				this._checkFinal();
				var name = this.name+'_';
				
				if(arguments.length == 1){
				    for(var k in obj){
				        this._re_defines[name+k] = obj[k];
				    }
				}else{
				    this._re_defines[name+obj] = value;
				}
				
				return this;
			},
		
			/*
			defines overrides everything.
			*/
			defines:function(d, value){
				this._checkFinal();
				
				if(arguments.length == 1){
				    for(var k in d){
				        this._re_defines[k] = d[k];    
				    }
				}else{
				    this._re_defines[d] = value;
				}
				
				return this;    
			},
		
			init:function(method){
				this._checkFinal();
				
				this._re_init = method;
				
				return this;    
			},
		
			dispose:function(method){
				this._checkFinal();
				
				this._re_dispose = method;
				
				return this;    
			},
		
			/*
			The lock method prevents modification to the component.
		
			This is handy to stop unexpected changes to a component.
			*/
			lock:function(){
				this._checkFinal();
				
				this._re_final = true;
				
				return this;
			},
		
			/*
			The run method allows a function to be ran in the context
			of the component.
		
			Useful to keep everything in one big component.
			*/
			run:function(method){
				this._checkFinal();
				
			    method.call(this);
				
				return this;
			}
		};
	};
});
