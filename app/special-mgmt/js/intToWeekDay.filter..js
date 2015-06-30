angular.module('app.special-mgmt')
    .filter('intToWeekDay', function () {
	'use strict';
	return function (item) {
		var day;
		switch (item) {
			case 1:
				day = "Monday";
				break;
			case 2:
				day = "Tuesday";
				break;
			case 3:
				day = "Wednesday";
				break;
			case 4:
				day = "Thursday";
				break;
			case 5:
				day = "Friday";
				break;
			case 6:
				day = "Saturday";
				break;
			case 7:
				day = "Sunday";
				break;
		}
		return day
	};
});