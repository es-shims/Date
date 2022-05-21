'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (getUTCFullYear, t) {
	t.test('returns the right value for negative dates', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDateFixtures(), function (item) {
			forEach(item.dates, function (date, i) {
				st.equal(getUTCFullYear(date), -109252, date + ' (index ' + i + ') is in UTC year -109252');
			});
		});

		st.end();
	});
};
