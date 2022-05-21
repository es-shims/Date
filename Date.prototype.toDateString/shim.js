'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateToDateString() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.toDateString` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ toDateString: polyfill },
		{ toDateString: function () { return Date.prototype.toDateString !== polyfill; } }
	);

	return polyfill;
};
