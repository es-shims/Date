'use strict';

var test = require('tape');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var implementation = require('../../Date.prototype.getUTCDate/implementation');
var runTests = require('./tests');

test('implementation', function (t) {
	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return implementation.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return implementation.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(implementation), t);

	t.end();
});
