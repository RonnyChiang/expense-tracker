// express
const express = require('express')
const router = express.Router()

// 引入modules
const home = require('./modules/home')
const records = require("./modules/records")
// use
router.use("/records", records)
router.use('/', home)
// export
module.exports = router