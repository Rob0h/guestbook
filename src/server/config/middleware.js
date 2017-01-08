var bodyParser = require('body-parser');
var morgan = require('morgan');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app, express) {
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(morgan('dev'));
  app.use(session({ secret: 'honeypot', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
}