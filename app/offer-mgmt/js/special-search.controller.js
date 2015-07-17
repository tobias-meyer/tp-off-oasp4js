angular.module('app.offer-mgmt')
    .controller('SpecialSearchCntl', function ($scope, offers, paginatedSpecialsList, $modal, globalSpinner) {
        'use strict';
        $scope.selectedItems = [];
        $scope.maxSize = 5;
        $scope.totalItems = paginatedSpecialsList.pagination.total;
        $scope.numPerPage = paginatedSpecialsList.pagination.size;
        $scope.currentPage = paginatedSpecialsList.pagination.page;

        $scope.gridOptions = {
            data: paginatedSpecialsList.result
        };

    });