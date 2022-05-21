'use strict';

var test = require('tape');
var hasStrictMode = require('has-strict-mode')();

var implementation = require('../../Date.now/implementation');
var runTests = require('./tests');

test('implementation', function (t) {
	t.test('not receiver-sensitive', { skip: !hasStrictMode }, function (st) {
		st.doesNotThrow(function () { return implementation.call(undefined); }, 'undefined is not an object');
		st.doesNotThrow(function () { return implementation.call(null); }, 'null is not an object');
		st.end();
	});

	runTests(implementation, t);

	t.end();
});
