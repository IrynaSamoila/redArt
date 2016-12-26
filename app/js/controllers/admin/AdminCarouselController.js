'use strict';

import module from '../../app';

module.controller('AdminCarouselController', ($scope, carouselItems, Resource, NotificationFactory, UploadingFactory) => {
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

	$scope.triggerUpload = function(item) {
		angular.element('#carousel-image-uploader').trigger('click');
		$scope.selectedItem = item;
	};

	$scope.uploadImage = function(event) {
		UploadingFactory.uploadFile({
			fileInput: event.target,
			url: '/api/carousel/images/' + encodeURIComponent($scope.selectedItem._id),
			onload: data => {
				$scope.selectedItem.filename = data.filename;
				$scope.$apply();
			}
		});
	};
});

export default module;
