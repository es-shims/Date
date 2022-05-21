'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (getUTCMonth, t) {
	t.test('returns the right value for negative dates', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDateFixtures(), function (item, index) {
			forEach(item.dates, function (date) {
				st.equal(getUTCMonth(date), index, date + ' is month ' + index);
			});
		});

		st.equal(getUTCMonth(new Date(8.64e15)), 8, '8.64e15 date is month 8');
		st.equal(getUTCMonth(new Date(0)), 0, '0 date is month 0');

		st.end();
	});
};
