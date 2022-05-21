'use strict';

var callBound = require('call-bind/callBound');

var $Date = require('../cache');

var $getTime = callBound('Date.prototype.getTime');

module.exports = function now() {
	return $getTime(new $Date());
};
