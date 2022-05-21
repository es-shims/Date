'use strict';

require('../../Date.prototype.toDateString/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.toDateString);

	t.equal(Date.prototype.toDateString.length, 0, 'Date.prototype.toDateString has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.toDateString.name, 'toDateString', 'Date.prototype.toDateString has name "toDateString"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'toDateString'), false, 'Date.prototype.toDateString is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.toDateString.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.toDateString.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.toDateString), t);

	t.end();
});
