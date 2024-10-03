'use strict';

var functionsHaveNames = require('functions-have-names')();
var hasPropertyDescriptors = require('has-property-descriptors')();
var forEach = require('for-each');

var getNegativeDate = require('../getNegativeDateFixtures');

var $Date = require('../../cache');

module.exports = function (Date, t) {
	t.equal(Date.length, 7, 'Date has a length of 7');

	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Date.name, 'Date', 'Date has name "Date"');
		st.end();
	});

	t.test('instances', function (st) {
		var date = new Date();
		st.ok(date instanceof Date, 'instanceof shimmed Date');
		st.ok(date instanceof $Date, 'instanceof original Date');

		st.end();
	});

	t.test('constructor', function (st) {
		st.test('works with standard formats', function (s2t) {
			//                                                                            Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
			s2t.equal(Number(new Date('2012-12-31T23:59:59.000Z')), 1356998399000); //    1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
			s2t.equal(Number(new Date('2012-04-04T05:02:02.170Z')), 1333515722170); //    1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			s2t.equal(Number(new Date('2012-04-04T05:02:02.170999Z')), 1333515722170); // 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			s2t.equal(Number(new Date('2012-04-04T05:02:02.17Z')), 1333515722170); //     1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			s2t.equal(Number(new Date('2012-04-04T05:02:02.1Z')), 1333515722100); //      1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			s2t.equal(Number(new Date('2012-04-04T24:00:00.000Z')), 1333584000000); //    NaN           1333584000000 1333584000000 1333584000000 1333584000000
			s2t.equal(Number(new Date('2012-02-29T12:00:00.000Z')), 1330516800000); //    1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
			s2t.equal(Number(new Date('2011-03-01T12:00:00.000Z')), 1298980800000); //    1298980800000 1298980800000 1298980800000 1298980800000 1298980800000

			// https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
			s2t.equal(
				new Date('2034-03-01T00:00:00.000Z') - new Date('2034-02-27T23:59:59.999Z'),
				86400001 //                                                               86400001      86400001      86400001      86400001             1
			);

			s2t.end();
		});

		st.test('is not enumerable', { skip: !hasPropertyDescriptors }, function (s2t) {
			s2t.notOk(Object.prototype.propertyIsEnumerable.call(new Date(), 'constructor'));

			s2t.end();
		});

		st.test('works as a function', function (s2t) {
			var zeroDate = Date(0);
			s2t.equal(zeroDate, String(zeroDate));
			var value = Date(1441705534578);
			s2t.equal(value, String(value));

			s2t.end();
		});

		st.test('fixes this Safari 8/9 bug', function (s2t) {
			var offset = new Date(1970).getTimezoneOffset() * 60e3;

			var timestamp = 2147483647; // Math.pow(2, 31) - 1
			var date = new Date(1970, 0, 1, 0, 0, 0, timestamp);
			var expectedTimestamp = timestamp + offset;
			s2t.equal(date.getTime(), expectedTimestamp);

			var brokenTimestamp = 2147483648; // Math.pow(2, 31)
			var brokenDate = new Date(1970, 0, 1, 0, 0, 0, brokenTimestamp);
			var expectedBrokenTimestamp = brokenTimestamp + offset;
			s2t.equal(brokenDate.getTime(), expectedBrokenTimestamp); // NaN in Safari 8/9

			var veryBrokenTS = 1435734000000;
			var veryBrokenDate = new Date(1970, 0, 1, 0, 0, 0, veryBrokenTS);
			var largeDate = new Date('Wed Jul 01 2015 07:00:00 GMT-0700 (PDT)');
			var expectedVeryBrokenTS = veryBrokenTS + (largeDate.getTimezoneOffset() * 60e3);
			s2t.equal(veryBrokenDate.getTime(), expectedVeryBrokenTS); // NaN in Safari 8/9

			s2t.end();
		});

		st.test('works with a Date object', function (s2t) {
			var date = new Date(1456297712984);
			var copiedDate = new Date(date);
			s2t.notEqual(date, copiedDate, 'dates are different instances');
			s2t.equal(copiedDate.getTime(), date.getTime(), 'dates have same time values');
			s2t.equal(Number(copiedDate), Number(date), 'dates ToNumber to the same value');
			s2t.equal(String(copiedDate), String(date), 'dates ToString to the same value');

			s2t.end();
		});
	});

	t.test('#valueOf()', function (st) {
		/*
		 * Note that new Date(1970, 0).valueOf() is 0 in UTC timezone.
		 * Check that it's a number (and an int), not that it's "truthy".
		 */
		var actual = (new Date(1970, 0)).valueOf();

		st.equal(typeof actual, 'number');
		st.notEqual(actual, NaN);
		st.equal(actual, Math.floor(actual), 'is an integer');

		st.end();
	});

	t.test('#getUTCDay()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date, index) {
				st.equal(date.getUTCDay(), item.getUTCDay[index]);
			});
		});

		st.end();
	});

	t.test('#getUTCHours()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getUTCHours(), 11);
			});
		});

		st.end();
	});

	t.test('#getUTCMinutes()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getUTCMinutes(), 59);
			});
		});

		st.end();
	});

	t.test('#getUTCSeconds()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getUTCSeconds(), 59);
			});
		});

		st.end();
	});

	t.test('#getUTCMilliseconds()', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getUTCMilliseconds(), 708);
			});
		});

		st.end();
	});

	t.test('#getDay()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date, index) {
				st.equal(date.getDay(), item.getDay[index]);
			});
		});

		st.end();
	});

	t.test('#getMonth()', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDate(), function (item, index) {
			forEach(item.dates, function (date) {
				st.equal(date.getMonth(), index);
			});
		});

		st.end();
	});

	t.test('#getHours()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getHours() + Math.floor(date.getTimezoneOffset() / 60), 11);
			});
		});

		st.end();
	});

	t.test('#getMinutes()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				var off = date.getTimezoneOffset();
				var offHours = Math.floor(off / 60);
				var offMins = off - (offHours * 60);
				var result = date.getMinutes() + offMins;
				// ceil/floor is for Firefox
				st.equal(
					result < 0 ? Math.ceil(result) : Math.floor(result),
					59,
					date + ' (' + +date + ') computes to ' + result + ' (which should be 59)'
				);
			});
		});

		st.end();
	});

	t.test('#getSeconds()', function (st) {
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date, i) {
				// the regex here is because in UTC, it's 59, but with TZData applied, which can have fractional hour offsets, it'll be 1.
				st.match(i + ':' + date.getSeconds(), new RegExp(i + ':(?:' + 59 + '|' + 1 + ')'));
			});
		});

		st.end();
	});

	t.test('#getMilliseconds()', function (st) {
		// Opera 10.6/11.61/Opera 12 bug
		forEach(getNegativeDate(), function (item) {
			forEach(item.dates, function (date) {
				st.equal(date.getMilliseconds(), 708, date + ' has 708 milliseconds');
			});
		});

		st.end();
	});
};
