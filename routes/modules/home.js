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
  let sortCategoryData = undefined
  const categoryItem = new Promise((resolve, reject) => {
    resolve(
      Category.find().select('name').sort({ _id: 'asc' }).lean()
    )
  })

  categoryItem
    .then(categories => {
      console.log(categories)
      categories.forEach(item => {
        if (item.name === sortCategory) item.selected = 'selected'
      })
      console.log(categories)
      console.log(categoryItem)
      return categoryItem
    })




  console.log(categoryItem)

  Category.find({ name: sortCategory }) //抓出資料庫所有類別
    .then(category => {
      sortCategoryData = category.find(data => data)
      const recordFind = sortCategoryData ? { $and: [{ userId }, { categoryId: sortCategoryData._id }] } : { userId } // 判斷是否有類別篩選id 
      Record.find(recordFind)
        .lean()
        .populate("categoryId")
        .sort({ _id: "asc" })
        .then(recordData => {
          const keywordFind = keyword ? keyword : "" // 判斷是否有keyword
          const recordsNameFilter = recordData.filter(data => data.name.toLowerCase().includes(keywordFind))
          recordsNameFilter.forEach(data => {
            data.date = moment(data.date).format("YYYY/MM/DD") //輸出日期
            totalAmount += data.amount  //累計金額
          })
          res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount, sortKeywords, categoryItem })
        })
        .catch(err => {
          console.log(err)
          res.render('errorPage', { status: 500, error: err.message })
        })
    })



})
module.exports = router