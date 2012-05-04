define(['./core/engine', './cycle/index', './utilities/index', './lib/index'], function(engine, cycle, utilities, lib){
	cycle(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});
