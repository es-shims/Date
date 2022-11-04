'use strict';

var callBind = require('call-bind');
var thisTimeValue = require('es-abstract/2022/thisTimeValue');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getUTCDay = callBind(Date.prototype.getUTCDay);
var $getUTCDate = callBind(Date.prototype.getUTCDate);
var $getUTCMonth = callBind(Date.prototype.getUTCMonth);
var $getUTCFullYear = callBind(Date.prototype.getUTCFullYear);
var $getUTCHours = callBind(Date.prototype.getUTCHours);
var $getUTCMinutes = callBind(Date.prototype.getUTCMinutes);
var $getUTCSeconds = callBind(Date.prototype.getUTCSeconds);

var dayNames = require('../helpers/dayNames');
var monthNames = require('../helpers/monthNames');

module.exports = function toUTCString() {
	thisTimeValue(this); // to brand check

	var day = $getUTCDay(this);
	var date = $getUTCDate(this);
	var month = $getUTCMonth(this);
	var year = $getUTCFullYear(this);
	var hour = $getUTCHours(this);
	var minute = $getUTCMinutes(this);
	var second = $getUTCSeconds(this);
	return dayNames[day] + ', '
		+ (date < 10 ? '0' + date : date) + ' '
		+ monthNames[month] + ' '
		+ year + ' '
		+ (hour < 10 ? '0' + hour : hour) + ':'
		+ (minute < 10 ? '0' + minute : minute) + ':'
		+ (second < 10 ? '0' + second : second) + ' GMT';
};
