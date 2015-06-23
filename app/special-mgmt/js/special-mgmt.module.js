angular.module(
	'app.special-mgmt',
	['ngRoute', 'app.offer-mgmt', 'app.sales-mgmt', 'app.main', 'app.specialMgmt.templates'],
	function ($routeProvider, oaspTranslationProvider) {
		'use strict';
		oaspTranslationProvider.enableTranslationForModule('table-mgmt');
		$routeProvider.when(
			'/special-mgmt/special-search',
			{
				templateUrl: 'special-mgmt/html/special-search.html',
				controller: 'SpecialSearchCntl',
				resolve: {
					paginatedSpecialList:
					[
						'specials',
						function (specials) {
							return specials.getPaginatedSpecials(1, 4).then(
								function (paginatedSpecials) {
									return paginatedSpecials;
								}
							);
						}
					],
					// TODO remove
					paginatedTableList:
					[
						'tables',
						function (tables) {
							return tables.getPaginatedTables(1, 4).then(
								function (paginatedTables) {
									return paginatedTables;
								}
							);
						}
					]
				}
			}
		);
	}
);