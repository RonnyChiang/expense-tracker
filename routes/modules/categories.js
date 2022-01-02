// introduce
const express = require("express")
const router = express.Router()
const Category = require("../../models/category")

// router

router.get("/", (req, res) => {
  return Category.find({})
    .lean()
    .sort({ _id: "asc" })
    .then(categoryData => {
      console.log(categoryData)
      res.render("categories", { categoryData })
    })

})


//export
module.exports = router