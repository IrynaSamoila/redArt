'use strict';

import module from '../app';

module.controller('LoginController', ($scope, $state, LoginFactory) => {
	$scope.user = {
		email: '',
		password: ''
	};

	function successLogin(data) {
		$state.go('adminMain');
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
