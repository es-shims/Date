'use strict';

var implementation = require('./implementation');

var aNegativeTestDate = new Date(-1509842289600292);
var timeZoneOffset = aNegativeTestDate.getTimezoneOffset && aNegativeTestDate.getTimezoneOffset();

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.toDateString !== 'function'
		// opera 12, IE 9
		|| aNegativeTestDate.toDateString() !== (timeZoneOffset < -720 ? 'Tue Jan 02 -45875' : 'Mon Jan 01 -45875')
	) {
		return implementation;
	}

	return Date.prototype.toDateString;
};
