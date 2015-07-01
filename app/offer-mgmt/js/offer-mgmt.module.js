angular.module(
	'app.offer-mgmt',
	['ngRoute', 'app.main', 'app.offerMgmt.templates'],
	function ($routeProvider, oaspTranslationProvider) {
		'use strict';
		oaspTranslationProvider.enableTranslationForModule('offer-mgmt');
		$routeProvider.when(
			'/offer-mgmt/special-search',
			{
				templateUrl: 'offer-mgmt/html/special-search.html',
				controller: 'SpecialSearchCntl',
				resolve: {
					paginatedSpecialList:
					[
						'offers',
						function (offers) {
							return offers.getPaginatedSpecials(1, 4).then(
								function (paginatedSpecials) {
									return paginatedSpecials;
								}
							);
						}
					]
				}
			}
		);
	}
);

