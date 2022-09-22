'use strict';

var implementation = require('./implementation');

var regexTester = require('safe-regex-test');

var hasNegativeYear = regexTester(/-000001/);
var negativeDate = -62198755200000;

module.exports = function getPolyfill() {
	if (
		typeof Date !== 'function'
		|| typeof Date.prototype.toISOString !== 'function'
	) {
		return implementation;
	}

	var hasNegativeDateBug = !hasNegativeYear(new Date(negativeDate).toISOString());
	var hasSafari51DateBug = new Date(-1).toISOString() !== '1969-12-31T23:59:59.999Z';
	var hasOpera115Bug = new Date(-3509827329600292).toISOString() !== '-109252-01-01T11:59:59.708Z';

	if (hasNegativeDateBug || hasSafari51DateBug || hasOpera115Bug) {
		return implementation;
	}

	return Date.prototype.toISOString;
};
