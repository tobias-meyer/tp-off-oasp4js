// Visual Studio Code Typings and autocompletion
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('app.special-mgmt').factory('specials', 
	
	//[ 'offers',
		
	function (specialManagementRestService, offers) {
		'use strict';
		var paginatedSpecials = {};

		return {
			isActive: function (special) {
				console.log("Is Special Active?: " + JSON.stringify(special));

				var now = new Date();

				var dayOfWeek = now.getDay();
				// map from javascript (sunday = 0) to java (sunday = 7)
				var dayOfWeekCorrected = dayOfWeek === 0 ? 7 : dayOfWeek;

				var isActiveDay = false;
				if (special.activePeriod.startingDay <= special.activePeriod.endingDay) {
					isActiveDay = dayOfWeekCorrected >= special.activePeriod.startingDay && dayOfWeekCorrected <= special.activePeriod.endingDay;
				} else {
					// around weekend
					isActiveDay = dayOfWeekCorrected >= special.activePeriod.startingDay || dayOfWeekCorrected <= special.activePeriod.endingDay;
				}
				console.log("Is Active Day: " + isActiveDay);

				var isActiveHour = false;
				if (special.activePeriod.startingHour < special.activePeriod.endingHour) {
					isActiveHour = now.getHours() >= special.activePeriod.startingHour && now.getHours() < special.activePeriod.endingHour;
				} else {
					// around midnight
					isActiveHour = now.getHours() >= special.activePeriod.startingHour || now.getHours() < special.activePeriod.endingHour;
				}
				console.log("Is Active Hour: " + isActiveHour);

				console.log("Is Active: " + isActiveDay && isActiveHour);
				return isActiveDay && isActiveHour;

			},
			addOffers: function (paginatedSpecialList) {
				var self = this;

				var result = offers
					.loadAllOffers()
					.then(
					function (allOffers) {
						paginatedSpecialList = paginatedSpecialList.map(function (current) {
							var allOffersFiltered = allOffers.filter(function (offer) {
								return offer.id === current.offerId;
							});
							var offer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;

							if (offer) {
								current.specialOffer = offer.description;
								current.originalPrice = offer.price;
								current.savings = (current.originalPrice - current.specialPrice).toFixed(2);
								// TODO better add percentage sign via filter
								current.savingsPercentage = ((current.savings / current.originalPrice) * 100).toFixed(0) + " %";
							}

							// calculate status
							current.activeStatus = self.isActive(current) ? "Active" : "Inactive";

							return current;
						});

						return paginatedSpecialList;

					}
					);
				return result;
			},
			getPaginatedSpecials: function (pagenumber, pagesize) {
				var self = this;
                var searchCriteria = {
                    pagination: {
                        page: pagenumber,
                        total: true
                    }
                };
				return specialManagementRestService.getPaginatedSpecials(searchCriteria).then(function (response) {
					angular.copy(response.data, paginatedSpecials);
					return self.addOffers(paginatedSpecials.result).then(function (amendedSpecials) {
						paginatedSpecials.result = amendedSpecials;
						return paginatedSpecials;
					});
				});
			},
			deleteSpecial: function (specialId) {
				return specialManagementRestService.deleteSpecial(specialId).then(function (response) {
					// TODO check status and display confirmation or error
				});
			},
			submitSpecial: function (special) {
				return specialManagementRestService.saveSpecial(special).then(function (response) {
					return response.data;
				});
			},
			loadSpecial: function (specialId) {
				var self = this;

				return specialManagementRestService.getSpecial(specialId).
					then(function (response) {
					// wrap in list
					return self.addOffers([response.data]);
				}).then(function (specialAsList) {
					// unwrap list
					return specialAsList[0];
				});
			},
			loadAllSpecials: function () {
				var self = this;

				return specialManagementRestService.getAllSpecials().then(function (response) {
					return self.addOffers(response.data);
				});
			},

		};
	}

//]

	);
