'use strict';

require('../../Date.prototype.getDate/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getDate);

	t.equal(Date.prototype.getDate.length, 0, 'Date.prototype.getDate has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getDate.name, 'getDate', 'Date.prototype.getDate has name "getDate"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getDate'), false, 'Date.prototype.getDate is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getDate.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getDate.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getDate), t);

	t.end();
});
