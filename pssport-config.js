const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('./models/user')

function initialize(passport) {
    const authenticateUser = (email, password, done) => {
        User.findOne({email: email}, (err, user) => {
            if(err) {
                return done(err)
            }
            if(!user) {
                return done(null, false, { message: "Incorrect user email"})
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                  return done(null, user)
                } else { 
                  return done(null, false, {message: "Incorrect password"})
                }
            })
    })}
     
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser)) 

    passport.serializeUser((user, done) => done(null, user.id))

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            return done(err, user)
        })
    })

}

module.exports = initialize