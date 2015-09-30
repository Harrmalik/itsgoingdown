var appVenues = angular.module('appVenues', ['appServices']);

appVenues.controller('VenueController', ['$http', '$scope', 'SearchService', '$routeParams', 'currentUserService', 
    function($http, $scope, SearchService, $routeParams, currentUserService) {
        $scope.home;
        $scope.term = 'bars';
        $scope.rating = 3;
        $scope.search = "14802";
        $scope.showing = false;
        $scope.biz = $routeParams.business;
        var location = $scope;
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
        })};
        
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
                console.log('clicked');
            });
        };
        
        //Gets the buisness based off ID
        $scope.getBiz = function() {
            $http.get("../api/biz/" + $scope.biz).success(function(data) {
                location.restaurant = data;
            });   
        };
        
        $scope.getReviews = function() {
            $http.get('/api/biz/' + $scope.biz + '/reviews').success(function(data){
                location.reviews = data;
                console.log(data);
            });
        };
        
        //if the url contains the id for a business automatically call it
        if ($scope.biz) {
            $scope.getBiz();
            $scope.getReviews();
        }
        
        $scope.addReview = function(review, restaurantId, userID) {
            var aReview = {
                review: review,
                'restaurantId': restaurantId
            };
            $http.post('api/reviews/' + userID, aReview).success(function(data){
     		});
     		$scope.getReviews();
        };
        
        $scope.addLike = function(userID) {
            $http.post('api/reviews/' + userID, {likes: +1}).success(function(data){
                location.reviews = data;
                //console.log(data);
            });
        };
}]);