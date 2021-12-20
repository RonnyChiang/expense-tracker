// express
const express = require('express')
const router = express.Router()

// 引入modules
const home = require('./modules/home')
// use
router.use('/', home)

// export
module.exports = router