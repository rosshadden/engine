define(['./core/engine', './cycle/index', './utilities/index', './lib/index'], function(engine, utilities, lib){
	engine.utilities = utilities(engine);
	
	return engine;
});
