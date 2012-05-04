define(['./core/engine', './utilities/index', './lib/index'], function(engine, utilities, lib){
	engine.utilities = utilities(engine);
	
	return engine;
});
