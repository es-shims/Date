'use strict';

var callBound = require('call-bound');
var thisTimeValue = require('es-abstract/helpers/timeValue');
var abs = require('es-abstract/2024/abs');

var $RangeError = require('es-errors/range');

// not using GetIntrinsic here intentionally, to not prime its cache
var $arraySlice = callBound('Array.prototype.slice');
var $getUTCDate = callBound('Date.prototype.getUTCDate');
var $getUTCFullYear = require('../Date.prototype.getUTCFullYear');
var $getUTCHours = callBound('Date.prototype.getUTCHours');
var $getUTCMilliseconds = callBound('Date.prototype.getUTCMilliseconds');
var $getUTCMinutes = callBound('Date.prototype.getUTCMinutes');
var $getUTCMonth = callBound('Date.prototype.getUTCMonth');
var $getUTCSeconds = callBound('Date.prototype.getUTCSeconds');
var $strSlice = callBound('String.prototype.slice');

module.exports = function toISOString() {
	var tv = thisTimeValue(this); // to brand check

	if (!isFinite(this) || !isFinite(tv)) {
		// Adope Photoshop requires the second check.
		throw new $RangeError('Date.prototype.toISOString called on non-finite value.');
	}

	var year = $getUTCFullYear(this);

	var month = (($getUTCMonth(this) % 12) + 12) % 12;

	// the date time string format is specified in 15.9.1.15.
	var result = [
		month + 1,
		$getUTCDate(this),
		$getUTCHours(this),
		$getUTCMinutes(this),
		$getUTCSeconds(this)
	];
	year = (year < 0 ? '-' : year > 9999 ? '+' : '')
		+ $strSlice('00000' + abs(year), year >= 0 && year <= 9999 ? -4 : -6);
	for (var i = 0; i < result.length; ++i) {
		// pad months, days, hours, minutes, and seconds to have two digits.
		result[i] = $strSlice('00' + result[i], -2);
	}
	// pad milliseconds to have three digits.
	return (
		year + '-' + $arraySlice(result, 0, 2).join('-')
		+ 'T' + $arraySlice(result, 2).join(':') + '.'
		+ $strSlice('000' + $getUTCMilliseconds(this), -3) + 'Z'
	);
};
