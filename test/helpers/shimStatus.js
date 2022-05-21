'use strict';

var name = require('function.prototype.name');

module.exports = function shimStatus(t, fn) {
	var isNative = (/\[native code\]/).test(Function.prototype.toString.call(fn));
	t.comment(name(fn) + ' shimmed: ' + (isNative ? 'no' : 'yes'));
};
