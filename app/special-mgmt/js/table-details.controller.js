angular.module('app.special-mgmt').controller('SpecialDetailsCntl',
    function ($scope, $sce, specials, specialDetails, allOffers, globalSpinner, positionStateNotification) {
        'use strict';
        $scope.special = specialDetails;
        $scope.allOffers = allOffers;
        $scope.trustAsHtml = function (value) {
            return $sce.trustAsHtml(value);
        };

        // form container to access forms added in parent scopes
        $scope.forms = {};

        $scope.submit = function () {
            globalSpinner.decorateCallOfFunctionReturningPromise(function () {
                return specials.submitSpecial($scope.special);
            }).then(function () {
                $scope.$close();
            });
        };
    });
