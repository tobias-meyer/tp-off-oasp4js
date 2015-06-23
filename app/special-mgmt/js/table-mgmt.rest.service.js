angular.module('app.special-mgmt').factory('specialManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/tablemanagement/v1';

	var mockpagination = { "size": 4, "page": 1, "total": 4 };

	var mockspecials = [
		{
			"id": 101,
			"modificationCounter": 1,
			"revision": null,
			"number": 1,
			"specialName": "Happy Hour",
			"offerId": 201,
			"specialPrice": "9.99",
			"activeFrom": 19,
			"activeTo": 21,
		},
		{
			"id": 102,
			"modificationCounter": 1,
			"revision": null,
			"number": 2,
			"specialName": "Midnight Deals",
			"offerId": 202,
			"specialPrice": "19.99",
			"activeFrom": 23,
			"activeTo": 3,
		},
		{
			"id": 103,
			"modificationCounter": 1,
			"revision": null,
			"number": 3,
			"specialName": "Mittagstisch",
			"offerId": 203,
			"specialPrice": "29.95",
			"activeFrom": 12,
			"activeTo": 14,
		},
		{
			"id": 104,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Early Bird",
			"offerId": 204,
			"specialPrice": "39.99",
			"activeFrom": 6,
			"activeTo": 7,
		}
				]


    return {
        getPaginatedSpecials: function (pagenumber, pagesize) {
            var tableSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
			// TODO switch to correct service
            return $http.post(servicePath + '/table/search', tableSearchCriteria).then(
				// TODO remove mock
				function (response) {
					response.data.pagination = mockpagination;
					response.data.result = mockspecials;
					return response;
				});
        },
		// TODO refactor / remove
        getTable: function (id) {
            return $http.get(servicePath + '/table/' + id);
        },
        getPaginatedTables: function (pagenumber, pagesize) {
            var tableSearchCriteria = {
                pagination: {
                    size: pagesize,
                    page: pagenumber,
                    total: true
                }
            };
            return $http.post(servicePath + '/table/search', tableSearchCriteria);
        },
        createTable: function (id, table) {
            return $http.put(servicePath + '/table/' + id, table);
        },
        deleteTable: function (id) {
            return $http.delete(servicePath + '/table/' + id);
        },
        saveTable: function (table) {
            return $http.post(servicePath + '/table/', table);
        },
        isTableReleasable: function (id) {
            return $http.get(servicePath + '/table/' + id + '/istablereleasable/');
        }
    };
});
