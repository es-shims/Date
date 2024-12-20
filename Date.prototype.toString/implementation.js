'use strict';

var callBound = require('call-bound');
var thisTimeValue = require('es-abstract/helpers/timeValue');

var abs = require('math-intrinsics/abs');
var floor = require('math-intrinsics/floor');

var monthNames = require('../helpers/monthNames');
var dayNames = require('../helpers/dayNames');

var $getDay = callBound('Date.prototype.getDay');
var $getDate = require('../Date.prototype.getDate');
var $getFullYear = require('../Date.prototype.getFullYear');
var $getMonth = require('../Date.prototype.getMonth');
var $getHours = callBound('Date.prototype.getHours');
var $getMinutes = callBound('Date.prototype.getMinutes');
var $getSeconds = callBound('Date.prototype.getSeconds');
var $getTimezoneOffset = callBound('Date.prototype.getTimezoneOffset');

module.exports = function toString() {
	var tv = thisTimeValue(this); // to brand check

	if (tv !== tv) {
		return 'Invalid Date';
	}

	var day = $getDay(this);
	var date = $getDate(this);
	var month = $getMonth(this);
	var year = $getFullYear(this);
	var hour = $getHours(this);
	var minute = $getMinutes(this);
	var second = $getSeconds(this);
	var timezoneOffset = $getTimezoneOffset(this);
	var hoursOffset = floor(abs(timezoneOffset) / 60);
	var minutesOffset = floor(abs(timezoneOffset) % 60);
	return dayNames[day] + ' '
		+ monthNames[month] + ' '
		+ (date < 10 ? '0' + date : date) + ' '
		+ year + ' '
		+ (hour < 10 ? '0' + hour : hour) + ':'
		+ (minute < 10 ? '0' + minute : minute) + ':'
		+ (second < 10 ? '0' + second : second) + ' GMT'
		+ (timezoneOffset > 0 ? '-' : '+')
		+ (hoursOffset < 10 ? '0' + hoursOffset : hoursOffset)
		+ (minutesOffset < 10 ? '0' + minutesOffset : minutesOffset);
};
