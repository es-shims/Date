'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateToUTCString() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.toUTCString` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ toUTCString: polyfill },
		{ toUTCString: function () { return Date.prototype.toUTCString !== polyfill; } }
	);

	return polyfill;
};
