'use strict';

var app = angular.module('userAuth');

app.service('AuthService', function($http, $state, UserService) {	

	this.logout = function() {
		$http.delete('/users/authenticate')
		.then(res => {
			UserService.destroy();
			$state.go('home');
		});
	};

  this.register = function(user) {
    return $http.post('/users/register', user)
    .then(res => UserService.set(res.data),
    			err => console.error(err));
  };

  this.login = function(user) {
    return $http.post('/users/authenticate', user)
    .then(res => UserService.set(res.data), 
    			err => console.error(err));
  };

	this.init = function() {
		$http.get('/users/profile')
		.then(res => UserService.set(res.data));
	};
});

app.service('UserService', function() {
	this.set = function(user) {
		this.username = user.username;
		this._id = user._id;
	};
	this.destroy = function() {
		this.username = null;
		this._id = null;
	};
});
