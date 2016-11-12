'use strict';

import module from '../../app';
import {errorMessages} from '../../globals.js';

const constraints = {
	email: {
		presence: {
			message: 'Пожалуйста, введите e-mail'
		},
		email: {
			message: 'Неправильный формат e-mail'
		}
	},
	password: {
		presence: {
			message: 'Пожалуйста, введите пароль'
		}
	}
};

module.controller('LoginController', ($scope, $state, $controller, LoginFactory, NotificationFactory) => {
	$controller('BaseAdminController', {$scope: $scope});

	$scope.user = {
		email: '',
		password: ''
	};

	function successLogin(data) {
		$state.go('adminMain');
	}

	$scope.login = () => {
		if (!$scope.getErrors($scope.user, constraints)) {
			LoginFactory.login($scope.user)
				.$promise
				.then(successLogin)
				.catch(e => {
					NotificationFactory.showDataError(e, errorMessages.DATA_CONNECTION);
				});
		}
	};
});

export default module;
