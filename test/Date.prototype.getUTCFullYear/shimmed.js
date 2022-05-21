'use strict';

require('../../Date.prototype.getUTCFullYear/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getUTCFullYear);

	t.equal(Date.prototype.getUTCFullYear.length, 0, 'Date.prototype.getUTCFullYear has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getUTCFullYear.name, 'getUTCFullYear', 'Date.prototype.getUTCFullYear has name "getUTCFullYear"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getUTCFullYear'), false, 'Date.prototype.getUTCFullYear is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getUTCFullYear.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getUTCFullYear.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getUTCFullYear), t);

	t.end();
});
