'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/2022/thisTimeValue');

var daysInMonth = require('../helpers/daysInMonth');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getUTCDate = callBind(Date.prototype.getUTCDate);
var $getUTCFullYear = callBind(Date.prototype.getUTCFullYear);
var $getUTCMonth = callBind(Date.prototype.getUTCMonth);

module.exports = function getUTCDate() {
	thisTimeValue(this); // to brand check

	var year = $getUTCFullYear(this);
	var month = $getUTCMonth(this);
	var date = $getUTCDate(this);
	if (year < 0 && month > 11) {
		if (month === 12) {
			return date;
		}
		var days = daysInMonth(0, year + 1);
		return (days - date) + 1;
	}
	return date;
};
