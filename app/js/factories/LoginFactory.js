'use strict';

import module from '../app';

module.factory('LoginFactory', ['$resource', $resource => {
	return $resource('/api/users/login', {}, {
		login: {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json; charset=UTF-8'
			}
		},
	});
}]);
