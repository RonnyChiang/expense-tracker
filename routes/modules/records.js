// express
const express = require('express')
const router = express.Router()

// introduce
const Record = require("../../models/record")
const Category = require("../../models/category")

//router
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { category, amount, name, date, description } = req.body
  return Category
    .findOne({ name: category })
    .then(category => category._id)
    .then(categoryId => {
      return Record
        .create({ name, date, amount, description, categoryId: categoryId })
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

router.delete("/:recordId", (req, res) => {
  const _id = req.params.recordId
  return Record.findById(_id)
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