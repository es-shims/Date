'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.getMonth !== 'function'
		|| new Date(-3509827329600292).getMonth() !== 0
	) {
		return implementation;
	}

	return Date.prototype.getMonth;
};
