// express
const express = require("express")
const router = express.Router()

// 引入modules
const home = require('./modules/home')
const records = require("./modules/records")
const users = require("./modules/users")
const categories = require("./modules/categories")
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
const auth = require("./modules/auth")
// use
router.use("/records", authenticator, records)
router.use("/categories", authenticator, categories)
router.use("/users", users)
router.use("/auth", auth)
router.use('/', authenticator, home)
// export
module.exports = router