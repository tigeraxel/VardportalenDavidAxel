const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const specialityManager = require('../../business-logic-layer/speciality-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')
const { route } = require('./account-router')


router.get('/', function (request, response) {
    response.render('loginPage.hbs')
})

router.get('/about', function (request, response) {
    response.render('about.hbs')
})
router.get('/location', function (request, response) {
    response.render('location.hbs')
})


router.get('/register', function (request, response) {
    response.render("loginPage.hbs")
})





module.exports = router