'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateGetFullYear() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.getFullYear` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ toString: polyfill },
		{ toString: function () { return Date.prototype.toString !== polyfill; } }
	);

	return polyfill;
};
