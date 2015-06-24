angular.module('app.special-mgmt')
    .filter('dateToTime', function () {
        'use strict';
        return function (item) {
			console.log("Formatting item: " + JSON.stringify(item));
			var hours = item.getHours() < 10 ? '0' + item.getHours() : item.getHours();
			var minutes = item.getMinutes() < 10 ? '0' + item.getMinutes() : item.getMinutes();
            return  hours + ':' + minutes + " o'Clock";
        };
    });