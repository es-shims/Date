'use strict';

var test = require('tape');

var implementation = require('../../Date/implementation');
var runTests = require('./tests');

test('implementation', function (t) {
	runTests(implementation, t);

	t.end();
});
