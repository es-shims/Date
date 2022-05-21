'use strict';

var forEach = require('for-each');

module.exports = function (parse, t) {
	t.test('is an invalid date', function (st) {
		var dates = [
			//                              Chrome 19+    Opera 12      Firefox 11    IE 9          Safari 5.1.1
			'2012-11-31T23:59:59.000Z', //  1354406399000 NaN           NaN           1354406399000 NaN
			'2012-12-31T23:59:60.000Z', //  NaN           NaN           NaN           NaN           135
			'2012-04-04T24:00:00.500Z', //  NaN           NaN           1333584000500 1333584000500 NaN
			'2012-12-31T10:08:60.000Z', //  NaN           NaN           NaN           NaN           135
			'2012-13-01T12:00:00.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2012-12-32T12:00:00.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2012-12-31T25:00:00.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2012-12-31T24:01:00.000Z', //  NaN           NaN           NaN           1356998460000 NaN
			'2012-12-31T12:60:00.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2012-12-31T12:00:60.000Z', //  NaN           NaN           NaN           NaN           135
			'2012-00-31T23:59:59.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2012-12-00T23:59:59.000Z', //  NaN           NaN           NaN           NaN           NaN
			'2011-02-29T12:00:00.000Z' //   1298980800000 NaN           NaN           1298980800000 NaN
		];
		forEach(dates, function (date) {
			st.equal(parse(date), NaN, date + ' is an invalid date');
		});

		st.end();
	});

	t.test('works', function (st) {
		var dates = {
			//                                               Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1  Safari 8
			'2012-12-31T23:59:59.000Z': 1356998399000, //    1356998399000 1356998399000 1356998399000 1356998399000 1356998399000 1356998399000
			'2012-04-04T05:02:02.170Z': 1333515722170, //    1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			'2012-04-04T05:02:02.170999Z': 1333515722170, // 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170.999
			'2012-04-04T05:02:02.17Z': 1333515722170, //     1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			'2012-04-04T05:02:02.1Z': 1333515722100, //      1333515722170 1333515722170 1333515722170 1333515722170 1333515722170 1333515722170
			'2012-04-04T24:00:00.000Z': 1333584000000, //    NaN           1333584000000 1333584000000 1333584000000 1333584000000 1333584000000
			'2012-02-29T12:00:00.000Z': 1330516800000, //    1330516800000 1330516800000 1330516800000 1330516800000 1330516800000 1330516800000
			'2011-03-01T12:00:00.000Z': 1298980800000 //     1298980800000 1298980800000 1298980800000 1298980800000 1298980800000 1298980800000
		};
		forEach(dates, function (tv, str) {
			st.equal(Math.floor(parse(str)), tv, str + ' parses and floors to ' + tv);
		});

		// https://github.com/es-shims/es5-shim/issues/80 Safari bug with leap day
		st.equal(
			parse('2034-03-01T00:00:00.000Z') - Date.parse('2034-02-27T23:59:59.999Z'),
			86400001 //                                     86400001      86400001      86400001      86400001             1
		);

		st.end();
	});

	var safariDate = new Date('2015-07-01');
	t.test('fixes a Safari 8/9 bug with parsing in UTC instead of local time', { skip: isNaN(Number(safariDate)) }, function (st) {
		var offset = safariDate.getTimezoneOffset() * 60e3;
		st.equal(parse('2015-07-01T00:00:00'), 1435708800000 + offset); // Safari 8/9 give NaN

		st.end();
	});

	t.test('supports extended years', function (st) {
		var dates = {
			//                                             Chrome 19     Opera 12      Firefox 11    IE 9          Safari 5.1.1
			'0000-01-01T00:00:00.000Z': -621672192e5, //  -621672192e5  -621672192e5  -621672192e5  -621672192e5  -621672192e5
			'0001-01-01T00:00:00Z': -621355968e5, //      -621355968e5  -621355968e5  -621355968e5   8.64e15      -621355968e5
			'+275760-09-13T00:00:00.000Z': 8.64e15, //     8.64e15       NaN           8.64e15       8.64e15       8.64e15
			'-271821-04-20T00:00:00.000Z': -8.64e15, //   -8.64e15       NaN          -8.64e15      -8.64e15      -8.6400000864e15
			'+275760-09-13T00:00:00.001Z': NaN, //         NaN           NaN           NaN           8.64e15 + 1   8.64e15 + 1
			'-271821-04-19T23:59:59.999Z': NaN, //         NaN           NaN           NaN          -8.64e15 - 1  -8.6400000864e15 - 1
			'+033658-09-27T01:46:40.000Z': 1e15, //        1e15          NaN           1e15          1e15          9999999136e5
			'-000001-01-01T00:00:00Z': -621987552e5, //   -621987552e5   NaN          -621987552e5  -621987552e5  -621987552e5
			'+002009-12-15T00:00:00Z': 12608352e5 //       12608352e5    NaN           12608352e5    12608352e5    12608352e5
		};
		forEach(dates, function (tv, date) {
			st.equal(parse(date), tv, date + ' parses to ' + tv);
		});

		st.end();
	});

	t.test('works with timezone offsets', function (st) {
		//                                                                 Chrome 19   Opera 12     Firefox 11   IE 9             Safari 5.1.1
		st.equal(parse('2012-01-29T12:00:00.000+01:00'), 132783480e4); //  132783480e4 132783480e4  132783480e4  132783480e4      132783480e4
		st.equal(parse('2012-01-29T12:00:00.000-00:00'), 132783840e4); //  132783840e4 132783840e4  132783840e4  132783840e4      132783840e4
		st.equal(parse('2012-01-29T12:00:00.000+00:00'), 132783840e4); //  132783840e4 132783840e4  132783840e4  132783840e4      132783840e4
		st.equal(parse('2012-01-29T12:00:00.000+23:59'), 132775206e4); //  132775206e4 132775206e4  132775206e4  132775206e4      132775206e4
		st.equal(parse('2012-01-29T12:00:00.000-23:59'), 132792474e4); //  132792474e4 132792474e4  132792474e4  132792474e4      132792474e4
		st.equal(parse('2012-01-29T12:00:00.000+24:00'), NaN); //          NaN         1327752e6    NaN          1327752000000    1327752000000
		st.equal(parse('2012-01-29T12:00:00.000+24:01'), NaN); //          NaN         NaN          NaN          1327751940000    1327751940000
		st.equal(parse('2012-01-29T12:00:00.000+24:59'), NaN); //          NaN         NaN          NaN          1327748460000    1327748460000
		st.equal(parse('2012-01-29T12:00:00.000+25:00'), NaN); //          NaN         NaN          NaN          NaN              NaN
		st.equal(parse('2012-01-29T12:00:00.000+00:60'), NaN); //          NaN         NaN          NaN          NaN              NaN
		st.equal(parse('-271821-04-20T00:00:00.000+00:01'), NaN); //       NaN         NaN          NaN         -864000000006e4 -864000008646e4
		st.equal(parse('-271821-04-20T00:01:00.000+00:01'), -8.64e15); // -8.64e15     NaN         -8.64e15     -8.64e15        -864000008640e4

		/*
		 * When time zone is missed, local offset should be used (ES 5.1 bug)
		 * see https://bugs.ecmascript.org/show_bug.cgi?id=112
		 */
		var tzOffset = Number(new Date(1970, 0));
		// same as (new Date().getTimezoneOffset() * 60000)
		st.equal(parse('1970-01-01T00:00:00'), tzOffset); //              tzOffset    0            0            0               NaN

		st.end();
	});
};
