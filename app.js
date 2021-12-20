// require
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

require('dotenv').config()

const routes = require('./routes')  // 引用路由器
require('./config/mongoose') // 引用mongoose

const PORT = process.env.PORT
const app = express()


app.use(express.urlencoded({ extended: true }))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public')) // static files
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 將 request 導入路由器
app.use(routes)

// 設定 port 3000
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})