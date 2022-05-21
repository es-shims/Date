'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateParse() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.parse` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date,
		{ parse: polyfill },
		{ parse: function () { return Date.parse !== polyfill; } }
	);

	return polyfill;
};
