'use strict';

var test = require('tape');

var index = require('../../Date');
var runTests = require('./tests');

test('entry point', function (t) {
	runTests(index, t);

	t.end();
});
