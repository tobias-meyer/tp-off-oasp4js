angular.module('app.offer-mgmt').controller('SpecialDetailsCntl',
    function ($scope, $sce, specialDetails, allOffers, globalSpinner, positionStateNotification, offers) {
        'use strict';
        $scope.special = specialDetails;
        $scope.allOffers = allOffers;
		var allOffersFiltered = allOffers.filter(function (offer) {
			return offer.id === $scope.special.offerId;
		});
        $scope.selectedOffer = allOffersFiltered.length > 0 ? allOffersFiltered[0] : null;

        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        // form container to access forms added in parent scopes
        $scope.forms = {};

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
				console.log("Saving special: " +JSON.stringify($scope.special));
                $scope.special.activePeriod.endingDay = $scope.special.activePeriod.endingDay;
                $scope.special.activePeriod.startingDay = $scope.special.activePeriod.startingDay;
                return offers.submitSpecial($scope.special);
            }).then(function () {
                $scope.$close();
            });
        };
		
		$scope.selectOffer = function (item, model) {
			$scope.selectedOffer = item;
			$scope.special.offerId = item.id;
		};
    });
