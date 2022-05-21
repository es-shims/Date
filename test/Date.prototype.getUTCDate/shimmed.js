'use strict';

require('../../Date.prototype.getUTCDate/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getUTCDate);

	t.equal(Date.prototype.getUTCDate.length, 0, 'Date.prototype.getUTCDate has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getUTCDate.name, 'getUTCDate', 'Date.prototype.getUTCDate has name "getUTCDate"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getUTCDate'), false, 'Date.prototype.getUTCDate is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getUTCDate.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getUTCDate.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getUTCDate), t);

	t.end();
});
