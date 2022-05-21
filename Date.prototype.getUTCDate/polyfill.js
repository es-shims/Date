'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.getUTCDate !== 'function'
	) {
		return implementation;
	}

	return Date.prototype.getUTCDate;
};
