'use strict';

require('../../Date.prototype.getUTCMonth/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getUTCMonth);

	t.equal(Date.prototype.getUTCMonth.length, 0, 'Date.prototype.getUTCMonth has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getUTCMonth.name, 'getUTCMonth', 'Date.prototype.getUTCMonth has name "getUTCMonth"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getUTCMonth'), false, 'Date.prototype.getUTCMonth is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getUTCMonth.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getUTCMonth.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getUTCMonth), t);

	t.end();
});
