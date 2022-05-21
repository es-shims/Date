'use strict';

module.exports = function (now, t) {
	t.test('gives the current time', function (st) {
		var before = (new Date()).getTime();
		var middle = now();
		var after = (new Date()).getTime();

		st.ok(middle >= before, 'middle is >= before');
		st.ok(middle <= after, 'middle is <= after');

		st.end();
	});
};
