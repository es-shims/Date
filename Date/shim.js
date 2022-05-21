'use strict';

var globalThis = require('globalthis');

var defineProperties = require('define-properties');

var getPolyfill = require('./polyfill');

module.exports = function shimDate() {
	var polyfill = getPolyfill();

	defineProperties(
		globalThis(),
		{ Date: polyfill },
		{ Date: function () { return Date !== polyfill; } }
	);

	return polyfill;
};
