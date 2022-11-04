'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/2022/thisTimeValue');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getFullYear = callBind(Date.prototype.getFullYear);
var $getMonth = callBind(Date.prototype.getMonth);
var $getDate = callBind(Date.prototype.getDate);

var daysInMonth = require('../helpers/daysInMonth');

module.exports = function getDate() {
	thisTimeValue(this); // to brand check

	var year = $getFullYear(this);
	var month = $getMonth(this);
	var date = $getDate(this);
	if (year < 0 && month > 11) {
		if (month === 12) {
			return date;
		}
		var days = daysInMonth(0, year + 1);
		return (days - date) + 1;
	}
	return date;
};
