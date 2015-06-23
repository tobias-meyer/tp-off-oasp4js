var mockData_specials = [
	{
		"id": 101,
		"modificationCounter": 1,
		"revision": null,
		"number": 1,
		"specialName": "Happy Hour",
		"offerId": 201,
		"specialPrice": "9.99",
		"activeFrom": "1900",
		"activeTo": "2100",
	},
	{
		"id": 102,
		"modificationCounter": 1,
		"revision": null,
		"number": 2,
		"specialName": "Midnight Deals",
		"offerId": 202,
		"specialPrice": "19.99",
		"activeFrom": "0000",
		"activeTo": "0300",
	},
	{
		"id": 103,
		"modificationCounter": 1,
		"revision": null,
		"number": 3,
		"specialName": "Mittagstisch",
		"offerId": 203,
		"specialPrice": "29.95",
		"activeFrom": "1200",
		"activeTo": "1400",
	},
	{
		"id": 104,
		"modificationCounter": 1,
		"revision": null,
		"number": 4,
		"specialName": "Early Bird",
		"offerId": 204,
		"specialPrice": "39.99",
		"activeFrom": "0600",
		"activeTo": "0700",
	}
];

angular.module('app.special-mgmt')
    .controller('SpecialSearchCntl', function ($scope, tables, paginatedTableList, $modal, globalSpinner, offers, sales) {
	'use strict';
	var selectedSpecial = function () {
		return $scope.selectedItems && $scope.selectedItems.length ? $scope.selectedItems[0] : undefined;
	};

	var loadOffers = function () {
		// TODO load offers
		calculateSavings();
	};

	var calculateSavings = function () {
		// TODO add original prices
		// TODO calc savings
	};

	var calculateStatus = function () {
		// TODO add original prices
		// TODO calc savings
	};

	$scope.openEditDialog = function (specialRow) {
		$modal.open({
			templateUrl: 'special-mgmt/html/special-details.html',
			controller: 'SpecialDetailsCntl',
			resolve: {
				tableDetails: function () {
					return tables.loadTable(specialRow.id);
				},
				allOffers: function () {
					return offers.loadAllOffers();
				},
				currentOrder: function () {
					return sales.loadOrderForTable(specialRow.id);
				}
			}
		});
	};

	$scope.selectedItems = [];
	$scope.maxSize = 5;
	$scope.totalItems = paginatedTableList.pagination.total;
	$scope.numPerPage = paginatedTableList.pagination.size;
	$scope.currentPage = paginatedTableList.pagination.page;


	$scope.gridOptions = {
		// TODO remove mocking
        //     data: paginatedTableList.result
		data: mockData_specials
	};


	$scope.reloadSpecials = function () {
		tables.getPaginatedTables($scope.currentPage, $scope.numPerPage).then(function (paginatedTables) {
			return paginatedTables;
		}).then(function (res) {
			paginatedTableList = res;
			// TODO remove mocking
			//$scope.gridOptions.data = paginatedTableList.result;
			$scope.gridOptions.data = mockData_specials;
		});
	};

	$scope.$watch('currentPage', function () {
		$scope.reloadSpecials();
	});

	$scope.buttonDefs = [
		{
			label: 'Edit Special',
			onClick: function () {
				$scope.openEditDialog(selectedSpecial());
			},
			isActive: function () {
				return selectedSpecial();
			}
		},
		{
			label: 'Create New Special',
			onClick: function () {
				// TODO initialize Details dialog
				// $scope.openEditDialog();
			},
			isActive: function () {
				return true;
			}
		},
		{
			label: 'Delete Special',
			onClick: function () {
				// TODO connect to service
				//specials.deleteSpecial(selectedSpecial().id);
			},
			isActive: function () {
				return selectedSpecial();
			}
		},
	];


});