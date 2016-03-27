var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/usernames', User.authMiddleware, function(req, res) {
  User.find({_id: {$ne: req.user._id}}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  }).select('username');
});

router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('cadecookie', token).send(user);
    }
  });
});

router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    var token = user.generateToken();
     if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('cadecookie', token).send(user);
    }
  });
});

router.delete('/authenticate', function(req, res) {
  res.clearCookie('cadecookie').send();
});

module.exports = router;
