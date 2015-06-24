angular.module('app.special-mgmt').factory('specialManagementRestService', function ($http, currentContextPath) {
    'use strict';

    // TODO change path
	//	var servicePath = currentContextPath.get() + 'services/rest/tablemanagement/v1';
	var servicePath = currentContextPath.get() + 'services/rest/specialmanagement/v1';

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
			"activeFrom": new Date(1970, 0, 1, 19, 0, 0),
			"activeTo": new Date(1970, 0, 1, 21, 0, 0),
		},
		{
			"id": 102,
			"modificationCounter": 1,
			"revision": null,
			"number": 2,
			"specialName": "Midnight Deals",
			"offerId": 202,
			"specialPrice": "19.99",
			"activeFrom": new Date(1970, 0, 1, 23, 0, 0),
			"activeTo": new Date(1970, 0, 1, 3, 0, 0),
		},
		{
			"id": 103,
			"modificationCounter": 1,
			"revision": null,
			"number": 3,
			"specialName": "Mittagstisch",
			"offerId": 203,
			"specialPrice": "29.95",
			"activeFrom": new Date(1970, 0, 1, 12, 0, 0),
			"activeTo": new Date(1970, 0, 1, 14, 0, 0),
		},
		{
			"id": 104,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Early Bird",
			"offerId": 204,
			"specialPrice": "39.99",
			"activeFrom": new Date(1970, 0, 1, 6, 0, 0),
			"activeTo": new Date(1970, 0, 1, 7, 0, 0),
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
            //return $http.post(servicePath + '/special/search', tableSearchCriteria).then(
            return $http.post(servicePath + '/table/search', tableSearchCriteria).then(
				// TODO remove mock
				function (response) {
					response.data.pagination = mockpagination;
					response.data.result = mockspecials;
					return response;
				});
        },
        deleteSpecial: function (id) {
            return $http.delete(servicePath + '/special/' + id);
        },
        createSpecial: function (id, special) {
            return $http.put(servicePath + '/special/' + id, special);
        },
        saveSpecial: function (special) {
            return $http.post(servicePath + '/special/', special);
        },
        getSpecial: function (id) {
			// TODO switch to correct service
            //return $http.get(servicePath + '/special/' + id).then(
            return $http.get(servicePath + '/table/' + id).then(
				function (response) {
					// TODO remove mock
					response.data = mockspecials[0];
					return response;
				}
				);
        },
    };
});
