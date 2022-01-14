// express
const express = require("express")
const router = express.Router()

// 引入modules
const categories = require("./modules/categories")
const { authenticator } = require('../middleware/auth')  // 掛載 middleware
const auth = require("./modules/auth")
const passport = require('passport')
const recordController = require('../controllers/recordController')
const userController = require('../controllers/userController.js')

// routing for home page
router.get('/', authenticator, recordController.getRecords)

// routing for record model
router.get('/records/new', authenticator, recordController.createRecord)
router.post('/records', authenticator, recordController.postRecord)
router.get('/records/:recordId/edit', authenticator, recordController.editRecord)
router.put('/records/:recordId', authenticator, recordController.putRecord)
router.delete('/records/:recordId', authenticator, recordController.deleteRecord)

// routing for users model
router.get('/users/register', userController.registerPage)
router.post('/users/register', userController.register)
router.get('/users/login', userController.loginPage)
router.post('/users/login', passport.authenticate('local', { failureRedirect: '/users/login' }), userController.login)
router.get('/users/logout', userController.logout)

router.use("/auth", auth)
// export
module.exports = router