'use strict';

var app = angular.module('userAuth');

app.controller('messagingCtrl', function($scope, $http) {
  $http.get('/users/usernames')
  .then(function(res) {
    console.log(res);
    $scope.users = res.data
  });

  $scope.send = function() {
    console.log('message: ', $scope.message);
  }
});

app.controller('navCtrl', function($scope, UserService, AuthService) {
  $scope.$watch(function() {
    return UserService.username;
  }, function(username) {
    $scope.username = username;
  });

  $scope.logout = function() {
    AuthService.logout();
  };
});

app.controller('authCtrl', function($scope, $state, AuthService) {
  $scope.state = $state.current.name;
  $scope.submit = function(user) {
    if($scope.state === 'register') {
      if(user.password !== user.password2) {
        $scope.user.password = $scope.user.password2 = '';
        alert('HEY. Passwords gotta match!');
      } else {
        AuthService.register(user)
        .then(function() {
          $state.go('home');
        }, function(err) {
          console.error(err)
        });
      }
    } else {
      AuthService.login(user)
      .then(function() {
        $state.go('home');
      }, function(err) {
          console.error(err)
      });
    }
  };
});

app.controller('testCtrl', function($scope, $http) {
  $scope.test = function() {
    $http.get('/protected')
      .then(function(res) {
        console.log('res:', res)
      }, function(err) {
        console.error(err);
      })
  }
});

app.controller('registerCtrl', function($scope, AuthService) {
  $scope.register = function(user) {
    AuthService.register(user)
      .then(function(res) {
        console.log('res:', res);
      }, function(err) {
        console.error(err);
      });
  };
});

app.controller('loginCtrl', function($scope, AuthService) {
  $scope.login = function(user) {
    AuthService.login(user)
      .then(function(res) {
      }, function(err) {
        console.error(err);
      });
  }
});

