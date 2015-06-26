angular.module('app.special-mgmt')
    .filter('price', function () {
        'use strict';
        return function (item) {
            return item + ' EUR';
        };
    });