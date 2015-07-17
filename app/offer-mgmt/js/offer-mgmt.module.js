angular.module('app.offer-mgmt', ['ngRoute', 'app.main', 'app.tableMgmt.templates'], function ($routeProvider, oaspTranslationProvider) {
    'use strict';
    oaspTranslationProvider.enableTranslationForModule('offer-mgmt');
    $routeProvider.when('/offer-mgmt/special-search', {
        templateUrl: 'offer-mgmt/html/special-search.html',
        controller: 'SpecialSearchCntl',
        resolve: {
            paginatedSpecialsList: ['offers', function (offers) {
                return offers.getPaginatedSpecials(1, 4).then(function(paginatedSpecials) {
                    return paginatedSpecials;
                });
            }]
        }
    });
});

