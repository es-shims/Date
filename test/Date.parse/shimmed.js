'use strict';

require('../../Date.parse/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.parse);

	t.equal(Date.parse.length, 1, 'Date.parse has a length of 1');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.parse.name, 'parse', 'Date.parse has name "parse"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date, 'parse'), false, 'Date.parse is not enumerable');
		et.end();
	});

	t.test('not receiver-sensitive', { skip: !hasStrictMode }, function (st) {
		st.doesNotThrow(function () { return Date.parse.call(undefined); }, 'undefined is not an object');
		st.doesNotThrow(function () { return Date.parse.call(null); }, 'null is not an object');
		st.end();
	});

	runTests(Date.parse, t);

	t.end();
});
