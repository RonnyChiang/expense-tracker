// express
const express = require("express");
const router = express.Router();
const moment = require("moment");
// introduce
const Record = require("../../models/record");
const Category = require("../../models/category");

const queryRecords = (recordOption, keyword) => {
  return Record.find(recordOption)
    .lean()
    .populate("categoryId")
    .sort({ _id: "asc" })
    .then(recordData => {
      const keywordFind = keyword ? keyword : "";
      console.log(keywordFind);
      const recordsNameFilter = recordData.filter(data =>
        data.name.toLowerCase().includes(keywordFind)
      );

      let totalAmount = 0;
      recordsNameFilter.forEach(data => {
        data.date = moment(data.date).format("YYYY/MM/DD");
        totalAmount += data.amount;
      });
    });
};

const getRecordOptions = ({ userId, sortCategory }) => {
  if (!sortCategory) {
    return Promise.resolve({ userId });
  }

  return Category.findOne({ name: sortCategory }) // uncertain way to query by name, please look it up.
    .then(category => {
      if (!category) {
        return { userId };
      }

      return { $and: [{ userId }, { categoryId: category._id }] };
    });
};

// route
router.get("/", (req, res) => {
  const userId = req.user._id;
  const { sortCategory, sortKeywords } = req.query;
  const keyword = sortKeywords;

  getRecordOptions({ userId, sortCategory })
    .then(recordOption => {
      return queryRecords(recordOption, keyword);
    })
    .then(() => {
      res.render("index", {
        recordData: recordsNameFilter,
        sortCategory,
        totalAmount,
        sortKeywords
      });
    })
    .catch(err => {
      console.log(err);
      res.render("errorPage", { status: 500, error: err.message });
    });
});
module.exports = router;
