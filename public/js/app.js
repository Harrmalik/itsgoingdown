var app = angular.module('itsGoingDown', ['ngRoute',  'appAuthentication', 'appServices']).run(function($rootScope, $http){
  
});

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: '/home.html',
      controller: 'AuthController',
      controllerAs: 'AuthCtrl'
    })
    //the login display
    .when('/login', {
      templateUrl: '/login.html',
      controller: 'AuthController'
    })
    //the signup display
    .when('/register', {
      templateUrl: '/register.html',
      controller: 'AuthController'
    })
    //the settings display
    .when('/settings', {
      templateUrl: '/settings.html',
      controller: 'settingsController'
    });
});



app.controller('NavController', function($scope) {
  	$scope.page = "index";
	
	$scope.selectedPage = function(currentPage) {
		$scope.page = currentPage;
	};
	
	$scope.isSelected = function(currentPage) {
		return $scope.page === currentPage;
	};
});
