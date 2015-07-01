angular.module('app.special-mgmt').factory('specialManagementRestService', function ($http, currentContextPath) {
    'use strict';

    var servicePath = currentContextPath.get() + 'services/rest/offermanagement/v1';

	// TODO remove
	var mockpagination = { "size": 4, "page": 1, "total": 4 };

	// TODO remove
	var mockspecials = [
		{
			"id": 10000000,
			"modificationCounter": 1,
			"revision": null,
			"number": 1,
			"specialName": "Happy Hour",
			"offerId": 5, // "Cola"
			"specialPrice": 0.99,
			"activePeriod" : {
				"startingDay" : 1, // Monday
				"endingDay" : 1, // Monday
				"startingHour" : 19,
				"endingHour" : 21
			}, 
		},
		{
			"id": 102,
			"modificationCounter": 1,
			"revision": null,
			"number": 2,
			"specialName": "Midnight Deals",
			"offerId": 5, // "Cola"
			"specialPrice": 0.99,
			"activePeriod" : {
				"startingDay" : 2, // Tuesday
				"endingDay" : 7, // Sunday
				"startingHour" : 23,
				"endingHour" : 3
			}, 
		},
		{
			"id": 103,
			"modificationCounter": 1,
			"revision": null,
			"number": 3,
			"specialName": "Mittagstisch",
			"offerId": 1, // "Schnitzel-Menü"
			"specialPrice": 6.95,
			activePeriod : {
				"startingDay" : 3, // Wednesday
				"endingDay" : 7, // Sunday
				"startingHour" : 12,
				"endingHour" : 14
			}, 
		},
		{
			"id": 104,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Early Bird",
			"offerId": 3, // "Pfifferlinge-Menü"
			"specialPrice": 18.99,
			"activePeriod" : {
				"startingDay" : 1, // Monday
				"endingDay" : 7, // Sunday
				"startingHour" : 6,
				"endingHour" : 7
			}, 
		},
		{
			"id": 105,
			"modificationCounter": 1,
			"revision": null,
			"number": 4,
			"specialName": "Simply Always",
			"offerId": 3, // "Pfifferlinge-Menü"
			"specialPrice": 7.99,
			"activeTo": new Date(1970, 0, 1, 23, 0, 0),
			"activePeriod" : {
				"startingDay" : 1, // Monday
				"endingDay" : 7, // Sunday
				"startingHour" : 0,
				"endingHour" : 23
			}, 
		}
	];


    return {
        getPaginatedSpecials: function (searchCriteria) {
			return $http.post(servicePath + '/special/search', searchCriteria);
        },
        deleteSpecial: function (id) {
            return $http.delete(servicePath + '/special/' + id);
        },
        saveSpecial: function (special) {
            return $http.post(servicePath + '/special/', special);
        },
        getSpecial: function (id) {
            return $http.get(servicePath + '/special/' + id);
        }
    };
});
