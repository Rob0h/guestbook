var db = require('../db');
var passport = require('passport');

module.exports = {

  login: function(req, res, next) {
    passport.authenticate('local', {
      successRedirect: '/properties', 
      failureRedirect: '/signin' 
    })(req, res, next);
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