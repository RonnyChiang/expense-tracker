// express
const express = require('express')
const router = express.Router()

// 引入modules
const home = require('./modules/home')
const records = require("./modules/records")
// use
router.use('/', home)
router.use("/records", records)

// export
module.exports = router