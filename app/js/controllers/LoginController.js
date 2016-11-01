'use strict';

import module from '../app';

module.controller('LoginController', ($scope, LoginFactory) => {
	$scope.user = {
		email: '',
		password: ''
	};

	$scope.login = () => {
		console.log();

		LoginFactory.login($scope.user).$promise.then(() => {
		})
		.catch(e => {
			console.log(e);
		});
	};
});

export default module;
