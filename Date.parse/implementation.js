'use strict';

var GetIntrinsic = require('get-intrinsic');

var callBind = require('call-bind');
var callBound = require('call-bind/callBound');

var floor = require('es-abstract/2022/floor');
var isNaN = require('es-abstract/helpers/isNaN');

var dayFromMonth = require('../helpers/dayFromMonth');

var $Date = require('../cache');
var $Number = GetIntrinsic('%Number%');
var pow = GetIntrinsic('%Math.pow%');

var maxSafeUnsigned32Bit = pow(2, 31) - 1;

// not using GetIntrinsic here intentionally, to not prime its cache
var $parse = callBind.apply(Date.parse);

// 15.9.1.15 Date Time String Format.
var isoDateExpression = /^(\d{4}|[+-]\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2})(?::(\d{2})(?:(\.\d{1,}))?)?(Z|(?:([-+])(\d{2}):(\d{2})))?)?)?)?$/;
// var isoDateExpression = new RegExp('^'
// 	+ '(\\d{4}|[+-]\\d{6})' // four-digit year capture or sign + 6-digit extended year
// 	+ '(?:-(\\d{2})' // optional month capture
// 	+ '(?:-(\\d{2})' // optional day capture
// 	+ '(?:' // capture hours:minutes:seconds.milliseconds
// 		+ 'T(\\d{2})' // hours capture
// 		+ ':(\\d{2})' // minutes capture
// 		+ '(?:' // optional :seconds.milliseconds
// 			+ ':(\\d{2})' // seconds capture
// 			+ '(?:(\\.\\d{1,}))?' // milliseconds capture
// 		+ ')?'
// 	+ '(' // capture UTC offset component
// 		+ 'Z|' // UTC capture
// 		+ '(?:' // offset specifier +/-hours:minutes
// 			+ '([-+])' // sign capture
// 			+ '(\\d{2})' // hours offset capture
// 			+ ':(\\d{2})' // minutes offset capture
// 		+ ')'
// 	+ ')?)?)?)?'
// 	+ '$');

var $exec = callBound('RegExp.prototype.exec');

var hasSafariSignedIntBug = isNaN(new Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1).getTime());

var toUTC = function toUTC(t) {
	var s = 0;
	var ms = t;
	if (hasSafariSignedIntBug && ms > maxSafeUnsigned32Bit) {
		// work around a Safari 8/9 bug where it treats the seconds as signed
		var msToShift = floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
		var sToShift = floor(msToShift / 1e3);
		s += sToShift;
		ms -= sToShift * 1e3;
	}
	return $Number(new $Date(1970, 0, 1, 0, 0, s, ms));
};

module.exports = function parse(string) {
	var match = $exec(isoDateExpression, string);
	if (match) {
		// parse months, days, hours, minutes, seconds, and milliseconds
		// provide default values if necessary
		// parse the UTC offset component
		var year = $Number(match[1]);
		var month = $Number(match[2] || 1) - 1;
		var day = $Number(match[3] || 1) - 1;
		var hour = $Number(match[4] || 0);
		var minute = $Number(match[5] || 0);
		var second = $Number(match[6] || 0);
		var millisecond = floor($Number(match[7] || 0) * 1000);
		// When time zone is missed, local offset should be used
		// (ES 5.1 bug)
		// see https://bugs.ecmascript.org/show_bug.cgi?id=112
		var isLocalTime = !!(match[4] && !match[8]);
		var signOffset = match[9] === '-' ? 1 : -1;
		var hourOffset = $Number(match[10] || 0);
		var minuteOffset = $Number(match[11] || 0);
		var result;
		var hasMinutesOrSecondsOrMilliseconds = minute > 0 || second > 0 || millisecond > 0;
		if (
			hour < (hasMinutesOrSecondsOrMilliseconds ? 24 : 25)
			&& minute < 60 && second < 60 && millisecond < 1000
			&& month > -1 && month < 12 && hourOffset < 24
			&& minuteOffset < 60 // detect invalid offsets
			&& day > -1
			&& day < (dayFromMonth(year, month + 1) - dayFromMonth(year, month))
		) {
			result = (
				((dayFromMonth(year, month) + day) * 24)
				+ hour
				+ (hourOffset * signOffset)
			) * 60;
			result = ((
				((result + minute + (minuteOffset * signOffset)) * 60)
				+ second
			) * 1000) + millisecond;
			if (isLocalTime) {
				result = toUTC(result);
			}
			if (-8.64e15 <= result && result <= 8.64e15) {
				return result;
			}
		}
		return NaN;
	}
	return $parse(this, arguments);
};
