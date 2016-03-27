'use strict';

var app = angular.module('userAuth', ['ui.router', 'docsTimeDirective']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', { url: '/', templateUrl: '/html/home.html', controller: 'homeCtrl' })

		.state('login',    { url: '/login',    templateUrl: '/html/auth.html', controller: 'authCtrl' })
		.state('register', { url: '/register', templateUrl: '/html/auth.html', controller: 'authCtrl' })
		
		.state('profile', { url: '/profile', templateUrl: '/html/profile.html',onEnter: stateProtection })
		.state('messaging', { url: '/messaging', templateUrl: '/html/messaging.html',onEnter: stateProtection,controller: 'messagingCtrl' })

	$urlRouterProvider.otherwise('/');
})

function stateProtection(UserService, $state) {
	if(!UserService.username) {
		$state.go('home');
	}
}

app.run(function(AuthService) {
	// attempt to make an authenticated request 
	// to receive the user info
	// this can set the UserService
	AuthService.init();
});

app.filter('titlecase', function() {
	return function(input) {
		return input[0].toUpperCase() + input.slice(1).toLowerCase();
	};
});