const mongoose = require('mongoose') // 載入 mongoose

// for heroku
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/expense-tracker"

mongoose.connect(MONGODB_URI) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

module.exports = db