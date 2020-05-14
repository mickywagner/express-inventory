var express = require('express');
var router = express.Router();

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
  // create a hashed password
  // create a user with the email and password saved to database
})

module.exports = router;
