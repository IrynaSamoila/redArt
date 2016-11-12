'use strict';

import module from '../app';

module.factory('CarouselApi', ['$resource', $resource => {
	return $resource('/api/carousel/:action/:id', {}, {
		list: {
			method: 'GET',
			params: {
				action: 'list'
			},
			isArray: true
		},
		remove: {
			method: 'DELETE',
			params: {
				id: '@id'
			}
		}
	});
}]);
