'use strict';

require('../../Date.prototype.getFullYear/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.getFullYear);

	t.equal(Date.prototype.getFullYear.length, 0, 'Date.prototype.getFullYear has a length of 0');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.getFullYear.name, 'getFullYear', 'Date.prototype.getFullYear has name "getFullYear"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'getFullYear'), false, 'Date.prototype.getFullYear is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.getFullYear.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.getFullYear.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.getFullYear), t);

	t.end();
});
