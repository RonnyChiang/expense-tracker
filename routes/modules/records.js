// express
const express = require('express')
const router = express.Router()

// introduce
const record = require('../../models/record')

//router
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {

})


//export
module.exports = router