'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateGetUTCFullYear() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.getUTCFullYear` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ getUTCFullYear: polyfill },
		{ getUTCFullYear: function () { return Date.prototype.getUTCFullYear !== polyfill; } }
	);

	return polyfill;
};
