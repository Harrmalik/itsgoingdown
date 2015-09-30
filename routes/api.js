var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
}

//Register the authentication middleware
router.use('/posts', isAuthenticated);

  var yelp = require("yelp").createClient({
    consumer_key: "Qmw5TbFRwFa8hNnGKshYxA", 
    consumer_secret: "u-_fc1ds4AKh2OqeZn6HU9gRJjE",
    token: "qRG5xQv6GhqoGR6t0il-uJ877OSzKjb_",
    token_secret: "xYrB5-isiGTDZPXqsgSwP7Efo6A"
  });

  //find the top 10 results based on a location and category
  router.get('/search/:location&&:term', function(req, res,next){
      // See http://www.yelp.com/developers/documentation/v2/search_api 
      yelp.search({term: req.params.term, location: req.params.location, limit:10}, function(error, data) {
        console.log(error);
        console.log(data);
        
         return res.json(data);
      });
  }); 


  //gets the business by ID 
  router.get('/biz/:business', function(req, res, next) {
      // See http://www.yelp.com/developers/documentation/v2/business
      yelp.business(req.params.business, function(error, data) {
        console.log(error);
        console.log(data);
        
        return res.json(data);
      });
  });

  // Gets reviews for a business
  router.route('/biz/:business/reviews')
    //get reviews for a restaurant
    .get(function(req, res) {
      User.findOne({"reviews.restaurantId": req.params.business}, {"display_name":1, "reviews.review":1, "reviews.date_created": 1, "reviews.likes": 1, "reviews.rating":1, "reviews.restaurantId":1} , function(err,data) {
        if (err)
          return res.send(err); 

        return res.json(data);
      });
  });

  // Creates a new review for a user
  router.route('/reviews/:user')
    //creates new review
    .post(function(req, res){
  		User.findOneAndUpdate({
  			"_id": req.params.user
  		},{
    			$push: {reviews: req.body	}
  		},{
  			upsert: true
  		},
  			function(err){
  				if(err)
  					return res.send(err);
  	
  				res.json("Review Added!");
  		});
  });

  // Adds a new review for a restaurant
  router.route('/reviews/addLike/:reviewID')
    //creates new review
    .post(function(req, res){
  		User.findOneAndUpdate({
  			"review.id": req.params.reviewID
  		},{
    			$push: {reviews: req.body	}
  		},{
  			upsert: true
  		},
  			function(err){
  				if(err)
  					return res.send(err);
  	
  				res.json("Review Added!");
  		});
});
    
  
module.exports = router;