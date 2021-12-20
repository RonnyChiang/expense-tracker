// express
const express = require('express')
const router = express.Router()

// introduce

// route
router.get('/', (req, res) => {
  res.render('index')
  // .catch(err => {
  //   console.log(err)
  //   res.render('error', { status: 500, error: err.message })
  // })
})

module.exports = router