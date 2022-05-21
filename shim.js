'use strict';

var shimDate = require('./Date/shim');
var shimDateNow = require('./Date.now/shim');
var shimDateParse = require('./Date.parse/shim');
var shimGetDate = require('./Date.prototype.getDate/shim');
var shimGetFullYear = require('./Date.prototype.getFullYear/shim');
var shimGetMonth = require('./Date.prototype.getMonth/shim');
var shimGetUTCDate = require('./Date.prototype.getUTCDate/shim');
var shimGetUTCFullYear = require('./Date.prototype.getUTCFullYear/shim');
var shimGetUTCMonth = require('./Date.prototype.getUTCMonth/shim');
var shimToDateString = require('./Date.prototype.toDateString/shim');
var shimToISOString = require('./Date.prototype.toISOString/shim');
var shimToJSON = require('./Date.prototype.toJSON/shim');
var shimToString = require('./Date.prototype.toString/shim');
var shimToUTCString = require('./Date.prototype.toUTCString/shim');

module.exports = function shimAllDate() {
	shimDateParse();
	shimDateNow();
	shimGetDate();
	shimGetFullYear();
	shimGetMonth();
	shimGetUTCDate();
	shimGetUTCFullYear();
	shimGetUTCMonth();
	shimToDateString();
	shimToISOString();
	shimToString();
	shimToUTCString();
	shimToJSON();
	shimDate();
};
