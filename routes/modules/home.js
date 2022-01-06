// express
const express = require('express')
const router = express.Router()
const moment = require('moment')
// introduce
const Record = require("../../models/record")
const Category = require('../../models/category')
// route
router.get('/', (req, res) => {
  const userId = req.user._id
  const { sortCategory, sortKeywords } = req.query
  const keyword = sortKeywords
  let totalAmount = 0
  let sortCategoryId = ""

  Category.find({}) //抓出資料庫所有類別
    .then(categories => {
      if (sortCategory) { // 有篩選存在找出id
        sortCategoryId = categories.filter(data => data.name === sortCategory)[0]._id
      }
      const recordFind = sortCategoryId ? { $and: [{ userId }, { categoryId: sortCategoryId }] } : { userId } // 判斷是否有類別篩選id 
      Record.find(recordFind)
        .lean()
        .populate("categoryId")
        .sort({ _id: "asc" })
        .then(recordData => {
          const keywordFind = keyword ? keyword : ""
          console.log(keywordFind)
          const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keywordFind))
          recordsNameFilter.forEach(data => {
            data.date = moment(data.date).format("YYYY/MM/DD")
            totalAmount += data.amount
          })
          res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount, sortKeywords })
        })
        .catch(err => {
          console.log(err)
          res.render('errorPage', { status: 500, error: err.message })
        })
    })


  // if (sortCategory === "" || !sortCategory) {
  //   Record.find({ userId })
  //     .lean()
  //     .populate("categoryId")
  //     .sort({ _id: "asc" })
  //     .then(recordData => {
  //       if (keyword) {
  //         const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keyword))
  //         recordsNameFilter.forEach(data => {
  //           data.date = moment(data.date).format("YYYY/MM/DD")
  //           totalAmount += data.amount
  //         })
  //         res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount, sortKeywords })
  //       } else {
  //         recordData.forEach(data => {
  //           data.date = moment(data.date).format("YYYY/MM/DD")
  //           totalAmount += data.amount
  //         })
  //         res.render("index", { recordData: recordData, sortCategory, totalAmount, sortKeywords })
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       res.render('errorPage', { status: 500, error: err.message })
  //     })
  // } else {
  //   return Category
  //     .findOne({ name: sortCategory })
  //     .then(category => category._id)
  //     .then(sortCategoryId => {
  //       console.log(sortCategoryId)
  //       Record.find({ categoryId: sortCategoryId, userId })
  //         .lean()
  //         .populate("categoryId")
  //         .sort({ _id: "asc" })
  //         .then(recordData => {
  //           const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keyword))
  //           recordsNameFilter.forEach(data => {
  //             data.date = moment(data.date).format("YYYY/MM/DD")
  //             totalAmount += data.amount
  //           })

  //           res.render("index", { recordData: recordsNameFilter, sortCategory, sortKeywords, totalAmount })
  //         })
  //         .catch(err => {
  //           console.log(err)
  //           res.render('errorPage', { status: 500, error: err.message })
  //         })
  //     })
  // }




})
module.exports = router