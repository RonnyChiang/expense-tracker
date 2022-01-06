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
  let categoryItemData = []
  // 從資料庫取得類別放入頁面
  const categoryItem = new Promise((resolve, reject) => {
    resolve(
      Category.find().sort({ _id: 'asc' }).lean()
    )
  })
  categoryItem
    .then(categories => {
      categories.forEach(item => {
        // 判斷目前所選類別 顯示於頁面
        if (item.name === sortCategory) item.selected = 'selected'
        categoryItemData.push(item)
      })
    })

  // 從資料庫取得資料 
  Category.find({ name: sortCategory }) //找到被篩選的類別
    .then(category => {
      sortCategoryData = category.find(data => data)
      const recordFind = sortCategoryData ? { $and: [{ userId }, { categoryId: sortCategoryData._id }] } : { userId } // 判斷是否有篩選類別
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
          res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount, sortKeywords, categoryItemData })
        })
        .catch(err => {
          console.log(err)
          res.render('errorPage', { status: 500, error: err.message })
        })
    })



})
module.exports = router