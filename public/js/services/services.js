var appServices = angular.module("appServices", ['ngResource']);

appServices.factory('currentUserService', function() {
    var currUser = undefined;
    return {
        getString: function() {
            return currUser;
        },
        setString: function(value) {
            currUser = value;
        },
        
    };
});

appServices.factory('SearchService', function() {
    var term = '';
    var setTerm = function(query) {
      term = query;
      console.log(term);
    };
   return term;
});