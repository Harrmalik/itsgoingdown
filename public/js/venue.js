var appVenues = angular.module('appVenues', ['appServices']);

appVenues.controller('VenueController', ['$http', '$scope', 'SearchService', '$routeParams', 
    function($http, $scope, SearchService, $routeParams) {
        $scope.search = "14802";
        var location = $scope;
        location.area = {};
        location.restaurants = {};
        location.restaurant = {};
        $scope.biz = $routeParams.business;
        
        $http.get("http://ip-api.com/json").success(function(data) {
            location.area = data;
        });
        $scope.setTerm = function(term) {
          $scope.search = term;
          console.log($scope.search);
        };
        
        $scope.query = function(term) {
            $http.get("../api/search/" + term).success(function(data) {
                console.log(data.businesses[0]);
                location.restaurants = data.businesses;
            });
        };
        
        $scope.getBiz = function() {
            $http.get("../api/businesses/" + $scope.biz).success(function(data) {
                console.log(data);
                location.restaurant = data;
            });   
        };
        
        if ($scope.biz) {
            $scope.getBiz();
        }
        // $scope.query("14802");
        // console.log($scope.search);
        //console.log(location.restaurants);
}]);