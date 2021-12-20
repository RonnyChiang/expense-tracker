// express
const express = require('express')
const router = express.Router()

// introduce
const Record = require('../../models/record')

//router
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const { category, amount, name, date, description } = req.body
  return Record.create({ name, date, amount, description, categoryId: category })
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


//export
module.exports = router