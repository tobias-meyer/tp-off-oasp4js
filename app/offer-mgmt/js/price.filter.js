angular.module('app.offer-mgmt')
    .filter('price', function () {
        'use strict';
        return function (item) {
            return item + ' EUR';
        };
    });