'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.getUTCFullYear !== 'function'
		|| new Date(-3509827329600292).getUTCFullYear() !== -109252
	) {
		return implementation;
	}

	return Date.prototype.getUTCFullYear;
};
