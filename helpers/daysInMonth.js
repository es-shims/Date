'use strict';

var callBind = require('call-bind');

// not using GetIntrinsic here intentionally, to not prime its cache
var $getDate = callBind(Date.prototype.getDate);

var $Date = require('../cache');

module.exports = function daysInMonth(month, year) {
	return $getDate(new $Date(year, month, 0));
};
