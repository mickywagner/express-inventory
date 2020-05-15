var express = require('express');
var router = express.Router();

const User = require('../models/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/store')
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  res.redirect('/users')
})

router.get('/register', function(req, res, next) {
  res.render('register')
})

router.post('/register', function(req, res, next) {
  const user = new User({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save(err => {
    if(err) {
      return next(err)
    }
    res.redirect('/users')
  })
})

module.exports = router;
