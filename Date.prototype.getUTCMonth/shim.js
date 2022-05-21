'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateGetUTCMonth() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.getUTCMonth` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ getUTCMonth: polyfill },
		{ getUTCMonth: function () { return Date.prototype.getUTCMonth !== polyfill; } }
	);

	return polyfill;
};
