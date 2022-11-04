'use strict';

var Invoke = require('es-abstract/2022/Invoke');
var ToObject = require('es-abstract/2022/ToObject');
var ToPrimitive = require('es-abstract/2022/ToPrimitive');
var Type = require('es-abstract/2022/Type');

var isFinite = require('es-abstract/helpers/isFinite');

// eslint-disable-next-line no-unused-vars
module.exports = function toJSON(key) {
	var O = ToObject(this); // step 1
	var tv = ToPrimitive(O, Number); // step 2
	if (Type(tv) === 'Number' && !isFinite(tv)) {
		return null; // step 3
	}
	return Invoke(O, 'toISOString');
};
