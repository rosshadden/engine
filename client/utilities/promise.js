define(function(){
	'use strict';
	
	var Promise = function(){
		var self = this;
		
		self.isDone = false;
		
		self.pending = [];
		
		self.resolve = function(result){
			self.complete('resolve', result);
		};
		
		self.reject = function(result){
			self.complete('reject', result);
		};
	};
	
	Promise.prototype = {
		done:	function(success, failure){
			this.pending.push({
				resolve:	success,
				reject:		failure
			});
			
			if(this.isDone){
				this.complete(this.isDone, this.result);
			}
			
			return this;
		},
		
		complete:	function(type, result){
			this.isDone = type;
			this.result = result;
			
			while(this.pending[0]){
				this.pending.shift()[type](result);
			}
		}
	};
	
	return Promise;
});
