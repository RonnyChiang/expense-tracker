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
  const keywords = sortKeywords
  const keyword = keywords
  let totalAmount = 0
  if (sortCategory === "" || !sortCategory) {
    Record.find({})
      .lean()
      .populate("categoryId")
      .sort({ _id: "asc" })
      .then(recordData => {
        if (keyword) {
          const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keyword))
          recordsNameFilter.forEach(data => {
            data.date = moment(data.date).format("YYYY/MM/DD")
            totalAmount += data.amount
            console.log(totalAmount)
          })
          res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount })
        } else {
          recordData.forEach(data => {
            data.date = moment(data.date).format("YYYY/MM/DD")
            totalAmount += data.amount
            console.log(totalAmount)
          })
          res.render("index", { recordData: recordData, sortCategory, totalAmount })
        }


        // .catch(err => {
        //   console.log(err)
        //   res.render('error', { status: 500, error: err.message })
        // })
      })
  } else {
    return Category
      .findOne({ name: sortCategory })
      .then(category => category._id)
      .then(sortCategoryId => {
        Record.find({ categoryId: sortCategoryId })
          .lean()
          .populate("categoryId")
          .sort({ _id: "asc" })
          .then(recordData => {
            const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keyword))
            recordsNameFilter.forEach(data => {
              data.date = moment(data.date).format("YYYY/MM/DD")
              totalAmount += data.amount
              console.log(totalAmount)
            })
            res.render("index", { recordData: recordsNameFilter, sortCategory, sortKeywords, totalAmount })



            // .catch(err => {
            //   console.log(err)
            //   res.render('error', { status: 500, error: err.message })
            // })
          })
      })
  }




})
module.exports = router