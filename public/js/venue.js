var appVenues = angular.module('appVenues', ['appServices']);

appVenues.controller('VenueController', ['$http', '$scope', 'SearchService', '$routeParams', 
    function($http, $scope, SearchService, $routeParams) {
        $scope.home;
        $scope.term = 'bars';
        var location = $scope;
        // location.restaurants = {};
        // location.restaurant = {};
        
        //Gets the users location
        $http.get("http://ip-api.com/json").success(function(data) {
            $scope.home = data.zip;
        });
        
        //Searches for the top 10 clubs near the user
        $scope.nearMe = function(){
            $http.get("../api/search/" + $scope.home + "&&clubs").success(function(data) {
                location.restaurants = data.businesses;
            });  
        };
        
        //Sets the users location for their profile
        $scope.setLocation = function(term) {
          $scope.search = term;
          console.log($scope.search);
        };
        
        //Gets the top 10 results based on location and category
        $scope.searchQuery = function(aLocation, aTerm) {
            $http.get("../api/search/" + aLocation + "&&" + aTerm).success(function(data) {
                location.restaurants = data.businesses;
            });
        };
        
        //Gets the buisness based off ID
        $scope.getBiz = function() {
            $http.get("../api/biz/" + $scope.biz).success(function(data) {
                console.log(data);
                location.restaurant = data;
            });   
        };
        
        //if the url contains the id for a business automatically call it
        if ($scope.biz) {
            $scope.getBiz();
        } else {
            //$scope.nearMe();
        }
}]);