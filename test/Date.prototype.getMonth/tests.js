'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (getMonth, t) {
	t.test('returns the right value for negative dates', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDateFixtures(), function (item, index) {
			forEach(item.dates, function (date) {
				st.equal(getMonth(date), index, date + ' is in month ' + index);
			});
		});

		st.end();
	});
};
