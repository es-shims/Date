'use strict';

var test = require('tape');
var hasStrictMode = require('has-strict-mode')();

var index = require('../../Date.parse');
var runTests = require('./tests');

test('entry point', function (t) {
	t.test('not receiver-sensitive', { skip: !hasStrictMode }, function (st) {
		st.doesNotThrow(function () { return index.call(undefined); }, 'undefined is not an object');
		st.doesNotThrow(function () { return index.call(null); }, 'null is not an object');
		st.end();
	});

	runTests(index, t);

	t.end();
});
