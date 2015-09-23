var appVenues = angular.module('appVenues', ['appServices']);

appVenues.controller('VenueController', ['$http', '$scope', 'SearchService', 
        '$routeParams', 
    function($http, $scope, SearchService, $routeParams) {
        $scope.search = "14802";
        var location = $scope;
        location.area = {};
        // location.restaurants = {};
        // location.restaurant = {};
        $scope.biz = $routeParams.business;
        var rests;
        
        $scope.nearMe = function() {
            $http.get("http://ip-api.com/json").success(function(data) {
                location.area = data.zip;
                $http.get("../api/search/" + location.area).success(function(data) {
                    rests = data.businesses;
                    // console.log(data.businesses[0]);
                });
            });
        };
       
        // $scope.nearMe();
        // console.log("worked" + rests);
        // $scope.setTerm = function(term) {
        //   $scope.search = term;
        // //   console.log($scope.search);
        // };
        
        $scope.query = function(term) {
            $http.get("../api/search/" + term).success(function(data) {
                // console.log(data.businesses[0]);
                location.restaurants = data.businesses;
            });
        };
        
        $scope.getBiz = function() {
            $http.get("../api/biz/" + $scope.biz).success(function(data) {
                // console.log(data);
                location.restaurant = data;
            });   
        };
        
        if ($scope.biz) {
            $scope.getBiz();
            $http.get('/api/biz/' + $scope.biz + '/reviews').success(function(data){
                location.reviews = data;
                console.log(data);
            });
            //reviewsFactory.query()
        }
        // $scope.query("14802");
        // console.log($scope.search);
        //console.log(location.restaurants);
}]);