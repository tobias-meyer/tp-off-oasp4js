// TODO remove
angular.module('app.special-mgmt').factory('specials', function (tableManagementRestService) {
    'use strict';
    var paginatedTables = {};
    return {
		mockdata: function () {
			var self = this;
			return self.addOffers(
				self.calculateStatus(
				[
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
				)
				);
		},
		isActive: function (special) {
			var now = new Date();
			if (special.activeFrom < special.activeTo) {
				return now.getHours() > special.activeFrom && now.getHours() > special.activeTo;
			} else {
				// around midnight
				return now.getHours() > special.activeFrom || now.getHours() > special.activeTo;
			}
		},
		calculateStatus: function (paginatedSpecialList) {
			var self = this;
			return paginatedSpecialList.filter(function (current) {
				current.activeStatus = self.isActive(current) ? "Active" : "Inactive";
				return current;
			});
		},
		addOffers: function (paginatedSpecialList) {
			
			// TODO read actual offers
			var offer = { "id": 1, 
				"modificationCounter": 1, 
				"revision": null, 
				"name": null, 
				"description": "Schnitzel-Menü", 
				"number": null, 
				"mealId": 1, 
				"drinkId": 10, 
				"sideDishId": 5, 
				"state": "NORMAL", 
				"price": "26.99" 
				};

			return paginatedSpecialList.filter(function (current) {
				current.specialOffer = offer.description;
				current.originalPrice = offer.price;
				current.savings = (current.originalPrice - current.specialPrice).toFixed(2);
				current.savingsPercentage = ((current.savings / current.originalPrice) *100).toFixed(0) + " %";
				return current;
			});

		},
        getPaginatedSpecials: function (pagenumber, pagesize) {
            return tableManagementRestService.getPaginatedTables(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedTables);
                return paginatedTables;
            });
        },
		//
		// TODO remove/refactor copypasted functions
		//
        getPaginatedTables: function (pagenumber, pagesize) {
            return tableManagementRestService.getPaginatedTables(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedTables);
                return paginatedTables;
            });
        },
        loadTable: function (tableId) {
            return tableManagementRestService.getTable(tableId).then(function (response) {
                return response.data;
            });
        },
        reserve: function (table) {
            table.state = 'RESERVED';
            return tableManagementRestService.saveTable(table).then(function () {
				// do nothing
            });
        },
        free: function (table) {
            table.state = 'FREE';
            return tableManagementRestService.saveTable(table).then(function () {
				// do nothing
            });
        },
        occupy: function (table) {
            table.state = 'OCCUPIED';
            return tableManagementRestService.saveTable(table).then(function () {
				// do nothing
            });
        },
        cancelReservation: function (table) {
            table.state = 'FREE';
            return tableManagementRestService.saveTable(table).then(function () {
				// do nothing
            });
        }
    };
});
