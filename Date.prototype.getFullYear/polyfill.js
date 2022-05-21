'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.getFullYear !== 'function'
		|| new Date(-3509827329600292).getFullYear() !== -109252
	) {
		return implementation;
	}

	return Date.prototype.getFullYear;
};
