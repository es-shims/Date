'use strict';

var test = require('tape');
var hasStrictMode = require('has-strict-mode')();

var index = require('../../Date.prototype.toDateString');
var runTests = require('./tests');

test('entry point', function (t) {
	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return index.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return index.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(index, t);

	t.end();
});
