var express = require('express');
var router = express.Router();


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

module.exports = router;