var db = require('../db');
var passport = require('passport');

module.exports = {

  login: function(req, res, next) {
    console.log('getting to here', req.body);
    passport.authenticate('local', {
      successRedirect: '/', 
      failureRedirect: '/login' 
    });
  },

  register: function(req, res, next) {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }).then(function(user) {
      res.sendStatus(201);
    });
  }
}