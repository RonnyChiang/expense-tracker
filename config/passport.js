const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require("../models/user")
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, req.flash("loginError", "That email is not registered!"))
        }
        return bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, req.flash("loginError", "Email or Password incorrect."))
            }
            return done(null, user)
          })
      })
    // .catch(err => {
    //   res.render(
    //     'errorPage',
    //     { status: 500, error: err.message }
    //   )
    // })
  }))

  // facebook auth
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
    (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)

          const randomPassword = Math.random().toString(36).slice(-8)

          bcrypt
            .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
            .then(salt => bcrypt.hash(randomPassword, salt)) // 為使用者密碼「加鹽」，產生雜湊值
            .then(hash => User.create({
              name,
              email,
              password: hash // 用雜湊值取代原本的使用者密碼
            }))
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}
