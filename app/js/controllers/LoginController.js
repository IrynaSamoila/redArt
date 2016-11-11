'use strict';

import _ from 'lodash';

import module from '../app';

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
	},
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

	function errorLogin(e) {
		let errorMessage = _.get(e, 'data.error', 'Общая ошибка соединения');

		NotificationFactory.showError({
			title: 'Ошибка',
			text: errorMessage
		});
	}

	$scope.login = () => {
		if (!$scope.getErrors($scope.user, constraints)) {
			LoginFactory.login($scope.user)
				.$promise
				.then(successLogin)
				.catch(errorLogin);
		}
	};
});

export default module;
