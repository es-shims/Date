'use strict';

require('../../Date.now/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.now);

	t.equal(Date.now.length, 0, 'Date.now has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.now.name, 'now', 'Date.now has name "now"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date, 'now'), false, 'Date.now is not enumerable');
		et.end();
	});

	t.test('not receiver-sensitive', { skip: !hasStrictMode }, function (st) {
		st.doesNotThrow(function () { return Date.now.call(undefined); }, 'undefined is not an object');
		st.doesNotThrow(function () { return Date.now.call(null); }, 'null is not an object');
		st.end();
	});

	runTests(Date.now, t);

	t.end();
});
