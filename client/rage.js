define(['./core/rage', './utilities/index', './lib/index'], function(rage, utilities, lib){
	rage.utilities = utilities(rage);
	
	return rage;
});
