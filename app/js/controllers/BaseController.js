'use strict';

import module from '../app';
import validate from '../validate';

module.controller('BaseAdminController', ($scope, NotificationFactory) => {
	$scope.hasErrors = false;
	$scope.errors = {};

	$scope.getErrors = function(data) {
		let errors = validate(data, constraints);

		$scope.hasErrors = !_.isEmpty(errors);
		$scope.errors = {};

		_.each(errors, (errorsList, field) => {
			$scope.errors[field] = errorsList[0];
		});

		return $scope.hasErrors;
	};
});

export default module;
