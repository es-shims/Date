'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (getDate, t) {
	t.test('returns the right value for negative dates', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDateFixtures(), function (item) {
			forEach(item.dates, function (date, index) {
				st.equal(getDate(date), item.days[index], date + ' is on date ' + item.days[index]);
			});
		});

		st.end();
	});
};
