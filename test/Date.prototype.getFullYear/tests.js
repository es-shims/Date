'use strict';

var forEach = require('for-each');

var getNegativeDateFixtures = require('../getNegativeDateFixtures');

module.exports = function (getFullYear, t) {
	t.test('returns the right value for negative dates', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDateFixtures(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(getFullYear(date), -109252, date + ' is in year -109252');
			});
		});

		st.end();
	});

	t.equal(
		getFullYear(new Date(-1509842289600292)),
		-45875,
		'very negative timestamp has expected negative year'
	);
};
