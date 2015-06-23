// TODO remove mocking
var mockData_specials = [
	{
		"id": 101,
		"modificationCounter": 1,
		"revision": null,
		"waiterId": "Nicht null",
		"number": 1,
		"specialPrice": 10,
		"state": "OCCUPIED"
	},
	{
		"id": 102,
		"modificationCounter": 1,
		"revision": null,
		"waiterId": null,
		"number": 2,
		"specialPrice": 20,
		"state": "FREE"
	},
	{
		"id": 103,
		"modificationCounter": 1,
		"revision": null,
		"waiterId": null,
		"number": 3,
		"specialPrice": 30,
		"state": "FREE"
	},
	{
		"id": 104,
		"modificationCounter": 1,
		"revision": null,
		"waiterId": null,
		"number": 4,
		"specialPrice": 40,
		"state": "ICH BIN ES"
	}
];

angular.module('app.special-mgmt')
    .controller('SpecialSearchCntl', function ($scope, tables, paginatedTableList, $modal, globalSpinner, offers, sales) {
	'use strict';
	var selectedSpecial = function () {
		return $scope.selectedItems && $scope.selectedItems.length ? $scope.selectedItems[0] : undefined;
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
			label: 'Edit...',
			onClick: function () {
				$scope.openEditDialog(selectedSpecial());
			},
			isActive: function () {
				return selectedSpecial();
			}
		},
		{
			label: 'Reserve',
			onClick: function () {
				globalSpinner.decorateCallOfFunctionReturningPromise(function () {
					return tables.reserve(selectedSpecial()).then($scope.reloadSpecials);
				});
			},
			isActive: function () {
				return selectedSpecial() && selectedSpecial().state === 'FREE';
			}
		},
		{
			label: 'Cancel Reservation',
			onClick: function () {
				globalSpinner.decorateCallOfFunctionReturningPromise(function () {
					return tables.cancelReservation(selectedSpecial()).then($scope.reloadSpecials);
				});
			},
			isActive: function () {
				return selectedSpecial() && selectedSpecial().state === 'RESERVED';
			}
		},
		{
			label: 'Occupy',
			onClick: function () {
				globalSpinner.decorateCallOfFunctionReturningPromise(function () {
					return tables.occupy(selectedSpecial()).then($scope.reloadSpecials);
				});
			},
			isActive: function () {
				return selectedSpecial() && (selectedSpecial().state === 'RESERVED' || selectedSpecial().state === 'FREE');
			}
		},
		{
			label: 'Free',
			onClick: function () {
				globalSpinner.decorateCallOfFunctionReturningPromise(function () {
					return tables.free(selectedSpecial()).then($scope.reloadSpecials);
				});
			},
			isActive: function () {
				return selectedSpecial() && selectedSpecial().state === 'OCCUPIED';
			}
		}
	];


});