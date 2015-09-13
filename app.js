var express = require('express');
var path = require('path');
var logger = require('morgan');
var passport = require("passport");
// Initialize Models
require('./models/users.js');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var connectMongo = require("connect-mongo");

var users = require('./routes/users')(passport);

var MongoStore = connectMongo(session);
mongoose.connect('mongodb://admin-mh:password@ds033317.mongolab.com:33317/heroku_l7nbt7vw');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(cookieParser());
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false,
  cookie: {
      path: '/',
      domain: '',
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
  store: new MongoStore({
      mongooseConnection: mongoose.connection
  })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', users);

//// Initialize Passport
var initPassport = require('./passport-init');
initPassport(passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
