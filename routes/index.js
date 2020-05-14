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

module.exports = router;
