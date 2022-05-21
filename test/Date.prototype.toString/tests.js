'use strict';

module.exports = function (toString, t) {
	var actual = toString(new Date(1449662400000));
	var re = /^Wed Dec 09 2015 \d\d:\d\d:\d\d GMT[-+]\d\d\d\d(?: |$)/;
	t.match(actual, re);

	t.equal(toString(new Date(NaN)), 'Invalid Date');
};
