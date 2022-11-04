'use strict';

var GetIntrinsic = require('get-intrinsic');
var defineProperties = require('define-properties');
var thisTimeValue = require('es-abstract/2022/thisTimeValue');
var floor = require('es-abstract/2022/floor');

var isNaN = require('es-abstract/helpers/isNaN');
var isPrimitive = require('es-abstract/helpers/isPrimitive');

var $parse = require('../Date.parse/polyfill')();

var $Date = require('../cache');

var pow = GetIntrinsic('%Math.pow%');
var $String = GetIntrinsic('%String%');

var maxSafeUnsigned32Bit = pow(2, 31) - 1;
var hasSafariSignedIntBug = isNaN(thisTimeValue(new $Date(1970, 0, 1, 0, 0, 0, maxSafeUnsigned32Bit + 1)));

var DateShim = function Date(Y, M, D, h, m, s, ms) {
	var length = arguments.length;
	var date;
	if (this instanceof $Date) {
		var seconds = s;
		var millis = ms;
		if (hasSafariSignedIntBug && length >= 7 && ms > maxSafeUnsigned32Bit) {
			// work around a Safari 8/9 bug where it treats the seconds as signed
			var msToShift = floor(ms / maxSafeUnsigned32Bit) * maxSafeUnsigned32Bit;
			var sToShift = floor(msToShift / 1e3);
			seconds += sToShift;
			millis -= sToShift * 1e3;
		}
		var parsed = $parse(Y);
		var hasNegTimestampParseBug = isNaN(parsed);
		date = length === 1 && $String(Y) === Y && !hasNegTimestampParseBug // isString(Y)
		// We explicitly pass it through parse:
			? new $Date(parsed)
		// We have to manually make calls depending on argument
		// length here
			: length >= 7 ? new $Date(Y, M, D, h, m, seconds, millis)
				: length >= 6 ? new $Date(Y, M, D, h, m, seconds)
					: length >= 5 ? new $Date(Y, M, D, h, m)
						: length >= 4 ? new $Date(Y, M, D, h)
							: length >= 3 ? new $Date(Y, M, D)
								: length >= 2 ? new $Date(Y, M)
									: length >= 1 ? new $Date(Y instanceof $Date ? Number(Y) : Y)
										: new $Date();
	} else {
		date = $Date.apply(this, arguments);
	}
	if (!isPrimitive(date)) {
		// Prevent mixups with unfixed Date object
		defineProperties(
			date,
			{ constructor: Date },
			{ constructor: true }
		);
	}
	return date;
};

// Copy "native" methods explicitly; they may be non-enumerable
defineProperties(DateShim, {
	now: $Date.now,
	parse: $Date.parse,
	UTC: $Date.UTC
}, true);

try {
	DateShim.prototype = $Date.prototype;
} catch (e) { /**/ }
// defineProperties(DateShim.prototype, { constructor: $Date }, true);

module.exports = DateShim;
