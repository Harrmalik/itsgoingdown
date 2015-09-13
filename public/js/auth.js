var appAuthentication = angular.module("appAuthentication", []);

appAuthentication.controller('AuthController', function($scope, $http, $rootScope, $location, $route, currentUserService){
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';
	

	$scope.login = function(){
		$http.post('/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$scope.scope_current_user = data.user.username;
				currentUserService.setString($scope.scope_current_user);
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};

	$scope.register = function(){
		$http.post('/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$scope.scope_current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
	
	//What does this do???? - Who wrote this?
	
	// This checks for whether the user has a current session or not
	// If is finds one automatically logs in else hits splash page -Malik
	$scope.checkSession = function(){
		$http.get('/success').success(function(data){
			if(data.state == 'success' && data.user){
				$rootScope.authenticated = true;
				$scope.scope_current_user = data.user.username;
				currentUserService.setString($scope.scope_current_user);
			}
			else{
				$scope.error_message = data.message;
			}
		});
	};
	
	$scope.signout = function(){
		$http.get('../signout');
		$rootScope.authenticated = false;
		$scope.scope_current_user = "";
		$location.path('/');
		
	};
	
	$scope.checkSession();
});