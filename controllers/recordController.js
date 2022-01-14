// express
const moment = require('moment')
const Record = require('../models/record')
const Category = require('../models/category')

module.exports = {
  getRecords: (req, res, next) => {
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

  },

  createRecord: (req, res, next) => {
    return res.render('new')
  },

  postRecord: (req, res, next) => {
    const userId = req.user._id
    const { category, amount, name, date, description } = req.body
    return Category
      .findOne({ name: category })
      .then(category => category._id)
      .then(categoryId => {
        return Record
          .create({ name, date, amount, description, categoryId: categoryId, userId })
      })
      .then(() => {
        res.redirect("/")
      })
      .catch(err => {
        res.render(
          'errorPage',
          { status: 500, error: err.message }
        )
      })
  },

  editRecord: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.recordId
    return Record.findOne({ _id, userId })
      .lean()
      .populate("categoryId")
      .then(record => {
        record.date = moment(record.date).format("YYYY-MM-DD")
        res.render("edit", { record })
      })
      .catch(err => {
        res.render(
          'errorPage',
          { status: 500, error: err.message }
        )
      })
  },

  putRecord: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.recordId
    const { category, amount, name, date, description } = req.body
    return Record.findOne({ _id, userId })
      .then(record => {
        return Category
          .findOne({ name: category })
          .then(category => category._id)
          .then(categoryId => {
            record.categoryId = categoryId
            record.amount = amount
            record.name = name
            record.date = date
            record.description = description

            return record.save()
          })
      })
      .then(() => res.redirect(`/`))
      .catch(err => {
        res.render(
          'errorPage',
          { status: 500, error: err.message }
        )
      })
  },
  deleteRecord: (req, res, next) => {
    const userId = req.user._id
    const _id = req.params.recordId

    return Record.findOne({ _id, userId })
      .then(record => record.remove())
      .then(() => res.redirect("/"))
      .catch(err => {
        res.render(
          'errorPage',
          { status: 500, error: err.message }
        )
      })
  }
}