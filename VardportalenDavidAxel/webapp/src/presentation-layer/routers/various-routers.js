const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')
const specialityManager = require('../../business-logic-layer/speciality-manager')
const bookingManager = require('../../business-logic-layer/booking-manager')


router.get('/', function (request, response) {
    response.render('loginPage.hbs')
})


router.get('/newDoctor', function (request, response) {
    response.render("addNewDoctor.hbs")
})


router.get('/register', function (request, response) {
    response.render("loginPage.hbs")
})

router.get('/newSpeciality', function (request, response) {
    specialityManager.getAllSpeciality(function (errors, specialitys) {
        const model = {
            errors: errors,
            specialitys: specialitys
        }
        console.log(specialitys)
        response.render("addNewSpeciality.hbs", model)
    })
})

router.post('/newSpeciality', function (request, response) {

    const specialityName = request.body.specialityName

    console.log(specialityName)

    specialityManager.createSpeciality(specialityName, function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL specialitys")
        response.redirect("/newSpeciality")
    })
})


router.post('/register', function (request, response) {
    const user = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        phoneNumber: request.body.phoneNumber,
        socialSecurityNumber: request.body.socialSecurityNumber,
        password: request.body.password

    }
    console.log(user)

    accountManager.createAccount(user, function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL användare")
        response.render("loginPage.hbs", model)
    })
})




router.post('/newDoctor', function (request, response) {

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


router.get('/bookings', function (request, response) {
console.log("fresh")
    bookingManager.getBookingsWithNames(function (errors, bookingsWithNames) {
        console.log(bookingsWithNames)
        const model = {
            errors: errors,
            bookingsWithNames: bookingsWithNames
        }
        response.render("bookingPage.hbs", model)

    })

})





module.exports = router