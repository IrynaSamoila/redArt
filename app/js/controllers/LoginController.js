'use strict';

import module from '../app';

module.controller('LoginController', ($scope, LoginFactory) => {
	$scope.user = {
		email: '',
		password: ''
	};

	function successLogin(data) {

	}

	function errorLogin(e) {
		console.log(e);
	}

	$scope.login = () => {
		LoginFactory.login($scope.user)
			.$promise
			.then(successLogin)
			.catch(errorLogin);
	};
});

export default module;
