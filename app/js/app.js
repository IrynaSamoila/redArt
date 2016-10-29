'use strict';

import angular from "angular";
import "angular-ui-router";
import "angular-route";

angular.module('app', [
	'ui.router',
	'ngRoute'
]).config(($stateProvider, $urlRouterProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'templates/pages/main.html',
		controller: 'MainController',
		resolve: {
			/*Resource: function (Factory) {
			 return Factory;
			 }*/
		},
		data: {
			'title': 'RedArt'
		}
	}).state('adminMain', {
		url: '/adminMain',
		templateUrl: 'templates/pages/adminMain.html',
		controller: 'AdminMainController',
		data: {
		'title': 'Администрирование RedArt'
		}
	 })/*.state('top_contributors', {
	 url: '/top-contributors',
	 templateUrl: 'templates/pages/topContributors.html',
	 controller: 'MainController',
	 data: {
	 'title': 'Top contributors'
	 }
	 })*/
});

export default angular.module('app');