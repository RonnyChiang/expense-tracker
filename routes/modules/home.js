// express
const express = require('express')
const router = express.Router()

// introduce
const Record = require("../../models/record")
const Category = require('../../models/category')
// route
router.get('/', (req, res) => {
  Record.find({})
    .lean()
    .sort({ _id: "asc" })
    .then(recordData => {
      const categoryIdData = recordData.categoryId
      console.log(categoryIdData)
      const categoryItem = Category.findOne({ categoryIdData })
      console.log(categoryItem.name)
      res.render("index", { recordData, categoryItem })
      // .catch(err => {
      //   console.log(err)
      //   res.render('error', { status: 500, error: err.message })
      // })
    })
})

module.exports = router