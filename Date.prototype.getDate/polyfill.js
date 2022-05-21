'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.getDate !== 'function'
		|| new Date(-3509827329600292).getDate() !== 1
	) {
		return implementation;
	}

	return Date.prototype.getDate;
};
