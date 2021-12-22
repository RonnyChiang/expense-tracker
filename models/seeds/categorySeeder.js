// model
const categories = require("../category")

// get from json
const categoryList = require("../../category.json").results
// mongoose
const db = require("../../config/mongoose")

db.once("open", () => {
  console.log("running categorySeeder script...")
  categories.create(categoryList)
    .then(() => {
      console.log("categorySeeder done!")
      db.close()
    })
    .finally(() => process.exit())
})
