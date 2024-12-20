'use strict';

var callBound = require('call-bound');
var thisTimeValue = require('es-abstract/helpers/timeValue');

var $getDay = callBound('Date.prototype.getDay');
var $getDate = require('../Date.prototype.getDate');
var $getMonth = require('../Date.prototype.getMonth');
var $getFullYear = require('../Date.prototype.getFullYear');

var dayNames = require('../helpers/dayNames');
var monthNames = require('../helpers/monthNames');

module.exports = function toDateString() {
	thisTimeValue(this); // to brand check

	var day = $getDay(this);
	var date = $getDate(this);
	var month = $getMonth(this);
	var year = $getFullYear(this);
	return dayNames[day] + ' '
		+ monthNames[month] + ' '
		+ (date < 10 ? '0' + date : date) + ' '
		+ year;
};
