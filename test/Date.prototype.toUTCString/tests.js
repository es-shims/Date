'use strict';

module.exports = function (toUTCString, t) {
	t.equal(
		toUTCString(new Date(-1509842289600292)),
		'Mon, 01 Jan -45875 11:59:59 GMT'
	);
};
