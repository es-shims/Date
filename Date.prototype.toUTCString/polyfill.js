'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.toUTCString !== 'function'
		|| new Date(-1509842289600292).toUTCString() !== 'Mon, 01 Jan -45875 11:59:59 GMT'
	) {
		return implementation;
	}

	return Date.prototype.toUTCString;
};
