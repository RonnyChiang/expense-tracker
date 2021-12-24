//introduce
const express = require('express')
const router = express.Router()
// const User = require("../../models/user")
// const passport = require("passport")
// const bcrypt = require("bcryptjs")
// route

router.get("/login", (req, res) => {
  res.render("login")
})

router.get("/register", (req, res) => {
  res.render("register")
})


module.exports = router