define(function(utilities){
	requestAnimFrame = (function(){
	  return  window.requestAnimationFrame       || 
		      window.webkitRequestAnimationFrame || 
		      window.mozRequestAnimationFrame    || 
		      window.oRequestAnimationFrame      || 
		      window.msRequestAnimationFrame     || 
		      function( callback ){
		        window.setTimeout(callback, 1000 / 60);
		      };
	})();
	
	return {
		requestAnimFrame:	requestAnimFrame
	};
});
