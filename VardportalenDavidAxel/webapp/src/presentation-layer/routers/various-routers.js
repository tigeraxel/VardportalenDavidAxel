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
router.get('/doctors/newDoctor', function (request, response) {
    response.render("addNewDoctor.hbs")
})


router.get('/register', function (request, response) {
    response.render("loginPage.hbs")
})


router.post('/doctors/newDoctor', function (request, response) {

    const user = {
        firstName: request.body.firstName,
        socialSecurityNumber: request.body.socialSecurityNumber,
        lastName: request.body.lastName
    }

    console.log(user)

    accountManager.GiveDoctorPrivilige(user, function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL DOKTOR")
        response.render("addNewDoctor.hbs", model)
    })
})

router.get("/doctors", function (request, response) {
    accountManager.getAllAccounts(function (errors, users) {
        const model = {
            errors: errors,
            users: users
        }
        response.render("ourDoctors.hbs", model)
    })
})



module.exports = router