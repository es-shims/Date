'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (toISOString, t) {
	t.test('supports extended years', function (st) {
		st.match(
			toISOString(new Date(-62198755200000)),
			/^-000001-01-01/
		);
		st.match(
			toISOString(new Date(8.64e15)),
			/^\+275760-09-13/
		);

		st.end();
	});

	t.test('returns correct dates', function (st) {
		st.equal(
			toISOString(new Date(-1)),
			'1969-12-31T23:59:59.999Z' // Safari 5.1.5 "1969-12-31T23:59:59.-01Z"
		);
		forEach(getNegativeDateFixtures(), function (item, index) {
			var m = index + 1;
			forEach(item.dates, function (date, idx) {
				var d = item.days[idx];
				st.equal(
					toISOString(date),
					'-109252-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + 'T11:59:59.708Z', // Opera 11.61/Opera 12 bug with Date#getUTCMonth
					date.getTime() + ' (index ' + idx + ') yields expected ISO string'
				);
			});
		});

		st.end();
	});
};
