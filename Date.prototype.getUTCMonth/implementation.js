'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/helpers/timeValue');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getUTCMonth = callBind(Date.prototype.getUTCMonth);
var $getUTCFullYear = callBind(Date.prototype.getUTCFullYear);

module.exports = function getUTCMonth() {
	thisTimeValue(this); // to brand check

	var year = $getUTCFullYear(this);
	var month = $getUTCMonth(this);
	if (year < 0 && month > 11) {
		return 0;
	}
	return month;
};
