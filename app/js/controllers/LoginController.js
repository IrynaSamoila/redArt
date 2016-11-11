'use strict';

import _ from 'lodash';

import module from '../app';
import validate from '../validate';

module.controller('LoginController', ($scope, $state, $controller, LoginFactory, NotificationFactory) => {
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

	$scope.hasErrors = false;
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

	// TODO: Move getErrors into base controller
	function getErrors(data) {
		let errors = validate(data, constraints);

		$scope.hasErrors = !_.isEmpty(errors);
		$scope.errors = {};

		_.each(errors, (errorsList, field) => {
			$scope.errors[field] = errorsList[0];
		});

		return $scope.hasErrors;
	}

	$scope.login = () => {
		if (!getErrors($scope.user)) {
			LoginFactory.login($scope.user)
				.$promise
				.then(successLogin)
				.catch(errorLogin);
		}
	};
});

export default module;
