angular.module('app.offer-mgmt')
    .directive('moneyToNumber', function () {
	'use strict';
	return {
        require: 'ngModel',
        link: function($scope, elem, attrs, ctrl) {
            ctrl.$parsers.push(function(val) {
                return "" + val;
            });
            ctrl.$formatters.push(function(val) {
                return parseFloat(val);
            });
        }
    }
});