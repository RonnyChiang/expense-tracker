// introduce
const express = require("express")
const router = express.Router()
const passport = require("passport")

// route
router.get("/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }))

router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/login/google',
  passport.authenticate('google', { scope: ['profile', "email"] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login', failureMessage: true }),
  function (req, res) {
    res.redirect('/');
  });

module.exports = router