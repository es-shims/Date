'use strict';

var callBound = require('call-bound');

var $Date = require('../cache');

var $getTime = callBound('Date.prototype.getTime');

module.exports = function now() {
	return $getTime(new $Date());
};
