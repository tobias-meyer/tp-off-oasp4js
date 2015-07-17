angular.module('app.offer-mgmt').factory('offerManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/offermanagement/v1';

    return {
        getAllOffers: function () {
            return $http.get(servicePath + '/offer');
        },
        getAllProducts: function () {
            return $http.get(servicePath + '/product');
        },
        getPaginatedSpecials: function (pagenumber, pagesize) {
            var specialSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
            return $http.post(servicePath + '/special/search', specialSearchCriteria);
        }
    };
});
