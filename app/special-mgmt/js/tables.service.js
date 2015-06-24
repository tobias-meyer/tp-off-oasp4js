// Visual Studio Code Typings and autocompletion
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('app.special-mgmt').factory('specials', function (specialManagementRestService) {
    'use strict';
    var paginatedSpecials = {};
	
    return {
		isActive: function (special) {
			var now = new Date();
			if (special.activeFrom < special.activeTo) {
				return now.getHours() > special.activeFrom && now.getHours() < special.activeTo;
			} else {
				// around midnight
				return now.getHours() > special.activeFrom || now.getHours() < special.activeTo;
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
			var self = this;
		
            return specialManagementRestService.getPaginatedSpecials(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedSpecials);
				// TODO use defer?
				paginatedSpecials.result = self.addOffers(self.calculateStatus(paginatedSpecials.result));
                return paginatedSpecials;
            });
        },
        deleteSpecial: function (specialId) {
            return specialManagementRestService.deleteSpecial(specialId).then(function (response) {
                // TODO check status and display confirmation or error
            });
        },
        submitSpecial: function (special) {
			if(special.id) {
	            return specialManagementRestService.saveSpecial(special).then(function (response) {
	                // TODO check status and display confirmation or error
	            });
			} else {
				// TODO how to determine id?
	            return specialManagementRestService.createSpecial(4711 ,special).then(function (response) {
	                // TODO check status and display confirmation or error
	            });
			}
        },
        loadSpecial: function (specialId) {
            return specialManagementRestService.getSpecial(specialId).then(function (response) {
				console.log("Response: " + JSON.stringify(response));
                return response.data;
            });
        },
    };
});
