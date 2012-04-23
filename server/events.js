var emitter = new (require('events').EventEmitter),
	handlers = {};

module.exports = {
	emitter:	emitter,
	handlers:	handlers
};
