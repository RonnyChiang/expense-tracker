// express
const express = require('express')
const router = express.Router()
const moment = require('moment')
// introduce
const Record = require("../../models/record")
const Category = require('../../models/category')
// route
router.get('/', (req, res) => {
  const { sortCategory, sortKeywords } = req.query
  if (sortCategory) {
    return Category
      .findOne({ name: sortCategory })
      .then(category => category._id)
      .then(sortCategoryId => {
        Record.find({ categoryId: sortCategoryId })
          .lean()
          .populate("categoryId")
          .sort({ _id: "asc" })
          .then(recordData => {
            recordData.forEach(data => {
              data.date = moment(data.date).format("YYYY/MM/DD")
            })
            res.render("index", { recordData, sortCategory })
            // .catch(err => {
            //   console.log(err)
            //   res.render('error', { status: 500, error: err.message })
            // })
          })
      })
  }
  Record.find({})
    .lean()
    .populate("categoryId")
    .sort({ _id: "asc" })
    .then(recordData => {
      recordData.forEach(data => {
        data.date = moment(data.date).format("YYYY/MM/DD")
      })
      res.render("index", { recordData })
    })
})
module.exports = router