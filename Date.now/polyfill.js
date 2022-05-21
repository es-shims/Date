'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (typeof Date !== 'function' || typeof Date.now !== 'function') {
		return implementation;
	}

	return Date.now;
};
