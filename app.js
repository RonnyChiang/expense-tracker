// require
const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')


const routes = require('./routes')  // 引用路由器
const PORT = process.env.PORT
const app = express()

