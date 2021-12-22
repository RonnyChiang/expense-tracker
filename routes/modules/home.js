// express
const express = require('express')
const router = express.Router()

// introduce
const Record = require("../../models/record")
// route
router.get('/', (req, res) => {
  Record.find({})
    .lean()
    .sort({ _id: "asc" })
    .then(recordData => res.render("index", { recordData }))
  // .catch(err => {
  //   console.log(err)
  //   res.render('error', { status: 500, error: err.message })
  // })
})

module.exports = router