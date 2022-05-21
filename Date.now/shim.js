'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateNow() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.now` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date,
		{ now: polyfill },
		{ now: function () { return Date.now !== polyfill; } }
	);

	return polyfill;
};
