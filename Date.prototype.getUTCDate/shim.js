'use strict';

var $SyntaxError = SyntaxError;

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDateGetUTCDate() {
	if (typeof Date !== 'function') {
		throw new $SyntaxError('`Date` must be present before `Date.prototype.getUTCDate` can be shimmed');
	}

	var polyfill = getPolyfill();
	defineProperties(
		Date.prototype,
		{ getUTCDate: polyfill },
		{ getUTCDate: function () { return Date.prototype.getUTCDate !== polyfill; } }
	);

	return polyfill;
};
