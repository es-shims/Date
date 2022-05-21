'use strict';

require('../../Date.prototype.getMonth/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getMonth);

	t.equal(Date.prototype.getMonth.length, 0, 'Date.prototype.getMonth has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getMonth.name, 'getMonth', 'Date.prototype.getMonth has name "getMonth"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getMonth'), false, 'Date.prototype.getMonth is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getMonth.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getMonth.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getMonth), t);

	t.end();
});
