'use strict';

import module from '../app';

module.factory('UserFactory', ['$resource', $resource => {
	return $resource('/api/users/:action', {}, {
		isAuthenticated: {
			method: 'GET',
			params: {
				action: 'authenticated'
			},
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}
	});
}]);
