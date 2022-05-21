'use strict';

require('../../Date.prototype.toJSON/auto');

var test = require('tape');
var defineProperties = require('define-properties');
var hasStrictMode = require('has-strict-mode')();
var callBind = require('call-bind');

var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = require('functions-have-names')();

var runTests = require('./tests');
var shimStatus = require('../helpers/shimStatus');

test('shimmed', function (t) {
	shimStatus(t, Date.prototype.toJSON);

	t.equal(Date.prototype.toJSON.length, 1, 'Date.prototype.toJSON has a length of 1');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.prototype.toJSON.name, 'toJSON', 'Date.prototype.toJSON has name "toJSON"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(isEnumerable.call(Date.prototype, 'toJSON'), false, 'Date.prototype.toJSON is not enumerable');
		et.end();
	});

	t.test('bad receiver', { skip: !hasStrictMode }, function (st) {
		st['throws'](function () { return Date.prototype.toJSON.call(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Date.prototype.toJSON.call(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(Date.prototype.toJSON), t);

	t.end();
});
