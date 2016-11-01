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
		controller: 'MainController',
		resolve: {
			/* Resource: function (Factory) {
			 return Factory;
			 } */
		},
		data: {
			'title': 'RedArt'
		}
	}).state('adminMain', {
		url: '/adminMain',
		templateUrl: 'templates/pages/adminMain.html',
		controller: 'AdminMainController',
		data: {
			title: 'Администрирование RedArt'
		}
	}).state('login', {
		url: '/login',
		templateUrl: 'templates/pages/login.html',
		controller: 'LoginController',
		data: {
			title: 'Авторизация'
		}
	});
});

export default angular.module('app');
