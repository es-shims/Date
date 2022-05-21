'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/2021/thisTimeValue');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getUTCFullYear = callBind(Date.prototype.getUTCFullYear);
var $getUTCMonth = callBind(Date.prototype.getUTCMonth);

module.exports = function getUTCFullYear() {
	thisTimeValue(this); // to brand check

	var year = $getUTCFullYear(this);
	if (year < 0 && $getUTCMonth(this) > 11) {
		return year + 1;
	}
	return year;
};
