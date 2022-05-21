'use strict';

module.exports = function (toJSON, t) {
	// Opera 11.6x/12 bug
	t.test('calls toISOString', function (st) {
		var date = new Date(0);
		var called = false;
		date.toISOString = function () {
			called = true;
			return 42; // Safari 10 throws when toISOString returns a non-primitive
		};
		st.equal(toJSON(date), 42);
		st.ok(called, 'called toISOString');

		st.end();
	});

	t.test('returns null for not finite dates', function (st) {
		var date = new Date(NaN);
		var json = toJSON(date);

		st.equal(json, null);

		st.end();
	});

	t.test('returns the isoString when stringified', { skip: typeof JSON !== 'function' }, function (st) {
		var date = new Date();
		st.equal(
			JSON.stringify(toJSON(date.toISOString())),
			JSON.stringify(toJSON(date))
		);
	});
};
