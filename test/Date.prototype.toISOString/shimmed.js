'use strict';

require('../../Date.prototype.toISOString/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.toISOString);

	t.equal(Date.prototype.toISOString.length, 0, 'Date.prototype.toISOString has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.toISOString.name, 'toISOString', 'Date.prototype.toISOString has name "toISOString"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'toISOString'), false, 'Date.prototype.toISOString is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.toISOString.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.toISOString.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.toISOString), t);

	t.end();
});
