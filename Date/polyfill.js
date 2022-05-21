'use strict';

var implementation = require('./implementation');

var needsConstructor = require('../helpers/needsConstructor');

module.exports = function getPolyfill() {
	if (typeof Date !== 'function' || needsConstructor) {
		return implementation;
	}

	return Date;
};
