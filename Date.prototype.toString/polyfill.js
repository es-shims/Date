'use strict';

var regexTester = require('safe-regex-test');

var callBind = require('call-bind');

var implementation = require('./implementation');

var aNegativeTestDate = new Date(-1509842289600292);
var timeZoneOffset = aNegativeTestDate.getTimezoneOffset && aNegativeTestDate.getTimezoneOffset();

var aPositiveTestDate = new Date(1449662400000);

var tester = regexTester(timeZoneOffset < -720
	? /^Thu Dec 10 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/
	: /^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/);

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.toString !== 'function'
		|| !tester(aPositiveTestDate.toString())
	) {
		return implementation;
	}

	if (String(new Date(NaN)) !== 'Invalid Date') {
		var bound = callBind(Date.prototype.toString);
		return function toString() {
			var valueOf = +this; // eslint-disable-line no-invalid-this, no-implicit-coercion
			if (valueOf !== valueOf) {
				return 'Invalid Date';
			}
			return bound(this); // eslint-disable-line no-invalid-this
		};
	}

	return Date.prototype.toString;
};
