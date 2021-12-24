//introduce
const express = require('express')
const router = express.Router()
const User = require("../../models/user")
const passport = require("passport")
// const bcrypt = require("bcryptjs")
// route

router.get("/login", (req, res) => {
  res.render("login")
})

router.post("/login", passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get("/register", (req, res) => {
  res.render("register")
})

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log("User already exists.")
        res.render("register", {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect("/"))

      }
    })
  // .catch(err => {
  //   res.render(
  //     'errorPage',
  //     { status: 500, error: err.message }
  //   )
  // })

})

router.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/users/login")
})

module.exports = router