define(['./core/engine', './cycle/index', './display/index', './utilities/index', './lib/index'], function(engine, cycle, display, utilities, lib){
	cycle(engine);
	display(engine);
	engine.utilities = utilities(engine);
	
	return engine;
});
