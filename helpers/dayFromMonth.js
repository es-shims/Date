'use strict';

var floor = require('es-abstract/2022/floor');

var months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];

module.exports = function dayFromMonth(year, month) {
	var t = month > 1 ? 1 : 0;
	return (
		months[month]
            + floor((year - 1969 + t) / 4)
            - floor((year - 1901 + t) / 100)
            + floor((year - 1601 + t) / 400)
            + (365 * (year - 1970))
	);
};
