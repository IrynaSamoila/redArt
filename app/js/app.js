'use strict';

import angular from 'angular';
import 'angular-ui-router';
import 'angular-route';
import 'angular-resource';

angular.module('app', [
	'ui.router',
	'ngRoute',
	'ngResource'
]).config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'templates/pages/main.html',
		data: {
			'title': 'RedArt'
		}
	}).state('adminMain', {
		url: '/admin/main',
		templateUrl: 'templates/pages/admin/main.html',
		controller: 'AdminMainController',
		data: {
			title: 'Администрирование RedArt'
		},
		private: true
	}).state('admin', {
		url: '/admin',
		templateUrl: 'templates/pages/admin/header.html',
		private: true
	}).state('admin.carousel', {
		url: '/carousel',
		templateUrl: 'templates/pages/admin/carousel.html',
		controller: 'AdminCarouselController',
		resolve: {
			Resource: CarouselApi => CarouselApi,
			carouselItems: (Resource, NotificationFactory) => {
				return Resource.list({})
					.$promise
					.catch(NotificationFactory.showDataError);
			}
		},
		data: {
			title: 'Карусель изображений'
		},
		private: true
	}).state('admin.upcoming', {
		url: '/upcoming',
		templateUrl: 'templates/pages/admin/upcoming.html',
		controller: 'AdminUpcomingController',
		data: {
			title: 'Афиша'
		},
		private: true
	}).state('admin.gallery', {
		url: '/gallery',
		templateUrl: 'templates/pages/admin/gallery.html',
		controller: 'AdminGalleryController',
		data: {
			title: 'Галлерея'
		},
		private: true
	}).state('admin.contacts', {
		url: '/contacts',
		templateUrl: 'templates/pages/admin/contacts.html',
		controller: 'AdminContactsController',
		data: {
			title: 'Контакты'
		},
		private: true
	}).state('login', {
		url: '/login',
		templateUrl: 'templates/pages/login.html',
		controller: 'LoginController',
		data: {
			title: 'Авторизация'
		}
	});
}).run(($rootScope, $state, UserFactory) => {
	$rootScope.$on('$stateChangeStart', (e, toState, toParams, fromState, fromParams) => {
		if (toState.private) {
			UserFactory.isAuthenticated()
				.$promise
				.then(data => {
					if (!data || !data.auhtenticated) {
						e.preventDefault();
						$state.go('login');
					}
				})
				.catch(error => {
					e.preventDefault();
					$state.go('login');
				});
		}
	});
});

export default angular.module('app');
