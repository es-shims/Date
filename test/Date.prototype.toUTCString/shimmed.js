'use strict';

require('../../Date.prototype.toUTCString/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.toUTCString);

	t.equal(Date.prototype.toUTCString.length, 0, 'Date.prototype.toUTCString has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.toUTCString.name, 'toUTCString', 'Date.prototype.toUTCString has name "toUTCString"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'toUTCString'), false, 'Date.prototype.toUTCString is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.toUTCString.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.toUTCString.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.toUTCString), t);

	t.end();
});
