// express
const express = require("express")
const router = express.Router()
const moment = require("moment")

// introduce
const Record = require("../../models/record")
const Category = require("../../models/category")


//router


router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
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
  // .catch(err => {
  //   res.render(
  //     'errorPage',
  //     { status: 500, error: err.message }
  //   )
  // })
})


// edit

router.get("/:recordId/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.recordId
  return Record.findOne({ _id, userId })
    .lean()
    .populate("categoryId")
    .then(record => {
      record.date = moment(record.date).format("YYYY-MM-DD")
      res.render("edit", { record })
      // .catch(err => {
      //   res.render(
      //     'errorPage',
      //     { status: 500, error: err.message }
      //   )
      // })
    })
})

router.put("/:recordId", (req, res) => {
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
  // .catch(err => {
  //   res.render(
  //     'errorPage',
  //     { status: 500, error: err.message }
  //   )
  // })
})


// delete
router.delete("/:recordId", (req, res) => {
  const userId = req.user._id
  const _id = req.params.recordId
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect("/"))
  // .catch(err => {
  //   res.render(
  //     'errorPage',
  //     { status: 500, error: err.message }
  //   )
  // })
})

//export
module.exports = router