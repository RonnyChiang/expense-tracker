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
  const { sortCategory, sortKeywords: keyword } = req.query
  let totalAmount = 0
  let sortCategoryData = null
  // 從資料庫取得類別放入頁面
  Category.find({})
    .sort({ _id: 'asc' })
    .lean()
    .then(categories => {
      let categoryItemData = [];
      categories.forEach(item => {
        // 判斷目前所選類別 顯示於頁面
        if (item.name === sortCategory) item.selected = 'selected'
        categoryItemData.push(item);
      });
      return categoryItemData
    })
    .then(categoryItemData => {
      // 從類別中找到目前篩選類別
      let sortCategoryData = categoryItemData.find(data => data.name === sortCategory)
      // 判斷是否有篩選類別
      const recordFind = sortCategoryData ? { $and: [{ userId }, { categoryId: sortCategoryData._id }] } : { userId }
      // 從資料庫取得紀錄
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
          res.render("index", { recordData: recordsNameFilter, sortCategory, totalAmount, keyword, categoryItemData })
        })
        .catch(err => {
          console.log(err)
          res.render('errorPage', { status: 500, error: err.message })
        })
    })

})
module.exports = router