'use strict';

var map = require('array.prototype.map');

var negativeCanned = [
	{
		getTime: -3509827329600292,
		getUTCDay: 4,
		getDay: 4,
		dim: 31
	},
	{
		getTime: -3509824651200292,
		getUTCDay: 0,
		getDay: 0,
		dim: 29
	},
	{
		getTime: -3509822145600292,
		getUTCDay: 1,
		getDay: 1,
		dim: 31
	},
	{
		getTime: -3509819467200292,
		getUTCDay: 4,
		getDay: 4,
		dim: 30
	},
	{
		getTime: -3509816875200292,
		getUTCDay: 6,
		getDay: 6,
		dim: 31
	},
	{
		getTime: -3509814196800292,
		getUTCDay: 2,
		getDay: 2,
		dim: 30
	},
	{
		getTime: -3509811604800292,
		getUTCDay: 4,
		getDay: 4,
		dim: 31
	},
	{
		getTime: -3509808926400292,
		getUTCDay: 0,
		getDay: 0,
		dim: 31
	},
	{
		getTime: -3509806248000292,
		getUTCDay: 3,
		getDay: 3,
		dim: 30
	},
	{
		getTime: -3509803656000292,
		getUTCDay: 5,
		getDay: 5,
		dim: 31
	},
	{
		getTime: -3509800977600292,
		getUTCDay: 1,
		getDay: 1,
		dim: 30
	},
	{
		getTime: -3509798385600292,
		getUTCDay: 3,
		getDay: 3,
		dim: 31
	}
];

module.exports = function getNegativeDateFixtures() {
	return map(negativeCanned, function (item) {
		var dateFirst = new Date(item.getTime);
		var dateLast = new Date(item.getTime + ((item.dim - 1) * 86400000));
		return {
			dates: [dateFirst, dateLast],
			days: [1, item.dim],
			getUTCDay: [item.getUTCDay, (item.getUTCDay + item.dim - 1) % 7],
			getDay: [item.getDay, (item.getDay + item.dim - 1) % 7]
		};
	});
};
