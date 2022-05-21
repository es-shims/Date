'use strict';

module.exports = function (toDateString, t) {
	t.equal(
		toDateString(new Date(-1509842289600292)),
		'Mon Jan 01 -45875'
	);
};
