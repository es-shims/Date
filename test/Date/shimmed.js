'use strict';

require('../../Date/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var globalThis = require('globalthis')();

var isEnumerable = Object.prototype.propertyIsEnumerable;

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(globalThis, 'Date'), false, 'globalThis.Date is not enumerable');
		et.end();
	});

	shimStatus(t, Date);

	runTests(Date, t);

	t.end();
});
