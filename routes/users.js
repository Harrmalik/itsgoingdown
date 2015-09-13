var express = require('express');
var router = express.Router();


module.exports = function(passport){
    /* GET home page. */
    router.get('/', function(req, res, next) {
      res.render('index', { title: "It's Going Down" });
    });

    //sends successful login state back to angular
    router.get('/success', function(req, res){
        res.send({state: 'success', user: req.user ? req.user : null});
    });

    //sends failure login state back to angular
    router.get('/failure', function(req, res){
        console.log(req);
        res.send({state: 'failure', user: null, message: "Your username or password was incorrect."});
    });

    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    }));

    //log out
    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    return router;

};
