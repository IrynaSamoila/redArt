'use strict';

import module from '../../app';

module.controller('AdminCarouselController', ($scope, carouselItems, Resource, NotificationFactory) => {
	$scope.carouselItems = carouselItems;

	$scope.removeItem = function(item) {
		NotificationFactory.showConfirm({
			text: 'Вы действительно хотите удалить эту фотографию?',
			confirmation: () => {
				Resource.remove({id: item._id})
					.$promise
					.then(response => {
						// refreshing item
						angular.extend(item, response);
					})
					.catch(NotificationFactory.showDataError);
			}
		});
	};
});

export default module;
