'use strict';

var implementation = require('./implementation');

var needsConstructor = require('../helpers/needsConstructor');

module.exports = function getPolyfill() {
	if (typeof Date !== 'function' || typeof Date.parse !== 'function' || needsConstructor) {
		return implementation;
	}

	var offset = new Date('2015-07-01').getTimezoneOffset() * 60e3;
	if (Date.parse('2015-07-01T00:00:00') !== 1435708800000 + offset) {
		return implementation;
	}

	return Date.parse;
};
