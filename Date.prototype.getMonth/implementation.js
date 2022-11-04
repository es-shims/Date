'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/2022/thisTimeValue');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getFullYear = callBind(Date.prototype.getFullYear);
var $getMonth = callBind(Date.prototype.getMonth);

module.exports = function getMonth() {
	thisTimeValue(this); // to brand check

	var year = $getFullYear(this);
	var month = $getMonth(this);
	if (year < 0 && month > 11) {
		return 0;
	}
	return month;
};
