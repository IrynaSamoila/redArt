'use strict';

import module from '../app';

module.directive('customOnChange', () => {
	return {
		restrict: 'A',
		link: (scope, element, attrs) => {
			const onChangeHandler = scope.$eval(attrs.customOnChange);
			element.bind('change', onChangeHandler);
		}
	};
});
