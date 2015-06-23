angular.module('app.special-mgmt')
    .controller('SpecialSearchCntl', function ($scope, tables, paginatedSpecialList, $modal, globalSpinner, offers, sales, appContext, oaspSecurityService, specials) {
	'use strict';


	$scope.isChief = function () {
		// TODO fix 
		// var result = appContext.getCurrentUser().then(function (currentUser) {
		// 	console.log("currentUser: " + JSON.stringify(currentUser));
		// 	return currentUser.getUserName() === "chief";
		// });
		// 
		// console.log("result: " + JSON.stringify(result));
		// return result;
		
		return true;
	};

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
					return offers
						.loadAllOffers()
						.then(
						function (response) {
							console.log("All Offers: " + JSON.stringify(response));
							return response;
						}
					);
				},
				currentOrder: function () {
					return sales.loadOrderForTable(specialRow.id);
				}
			}
		});
	};

	$scope.selectedItems = [];
	$scope.maxSize = 5;
	$scope.totalItems = paginatedSpecialList.pagination.total;
	$scope.numPerPage = paginatedSpecialList.pagination.size;
	$scope.currentPage = paginatedSpecialList.pagination.page;


	$scope.gridOptions = {
		// TODO remove mocking
        //     data: paginatedSpecialList.result
		data: specials.mockdata()
	};


	$scope.reloadSpecials = function () {
		tables.getPaginatedTables($scope.currentPage, $scope.numPerPage).then(function (paginatedTables) {
			return paginatedTables;
		}).then(function (res) {
			paginatedSpecialList = res;
			// TODO remove mocking
			//$scope.gridOptions.data = paginatedSpecialList.result;
			$scope.gridOptions.data = specials.mockdata();
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