// Visual Studio Code Typings and autocompletion
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('app.special-mgmt').factory('specials', 
	
//[ 'offers',
		
	function (specialManagementRestService) {
    'use strict';
    var paginatedSpecials = {};
	
    return {
		isActive: function (special) {
			var now = new Date();
			if (special.activeFrom < special.activeTo) {
				return now.getHours() > special.activeFrom.getHours() && now.getHours() < special.activeTo.getHours();
			} else {
				// around midnight
				return now.getHours() > special.activeFrom.getHours() || now.getHours() < special.activeTo.getHours();
			}
		},
		addOffers: function (paginatedSpecialList) {
			var self = this;
			
			// TODO read actual offers and match	
			var allOffers = [];

			return paginatedSpecialList.map(function (current) {
				var allOffersFiltered = allOffers.filter(function(offer) { 
					// TODO also check for id
					return offer.description === current.specialOffer; 
				});
        		var offer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;
				// TODO remove mock	
				offer = { "id": 1, 
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
				
				current.specialOffer = offer.description;
				current.originalPrice = offer.price;
				current.savings = (current.originalPrice - current.specialPrice).toFixed(2);
				// TODO better add percentage sign via filter
				current.savingsPercentage = ((current.savings / current.originalPrice) *100).toFixed(0) + " %";
				current.activeStatus = self.isActive(current) ? "Active" : "Inactive";
				return current;
			});

		},
        getPaginatedSpecials: function (pagenumber, pagesize) {
			var self = this;
		
            return specialManagementRestService.getPaginatedSpecials(pagenumber, pagesize).then(function (response) {
                angular.copy(response.data, paginatedSpecials);
				// TODO use defer?
				paginatedSpecials.result = self.addOffers(paginatedSpecials.result);
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
			var self = this;

            return specialManagementRestService.getSpecial(specialId).then(function (response) {
				var amendedSpecial = self.addOffers([ response.data ]);
				//console.log("Amended Special: " + JSON.stringify(amendedSpecial));
                return amendedSpecial[0];
            });
        },
    };
}

//]

);
