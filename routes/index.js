var express = require('express');
var router = express.Router();
const passport = require('passport')

const bcrypt = require('bcryptjs')
const User = require('../models/user')
const initializePassport = require('../pssport-config')
initializePassport(passport)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/store')
});

router.get('/register', function(req, res) {
  res.render('register')
})

router.post('/register', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    const user = new User({
      username: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }).save(err => {
      if(err) {
        return next(err)
      }
      res.redirect('/users')
    })
  }) 
})

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login'
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})



module.exports = router;
