const express = require('express')
const router = express.Router()
const accountManager = require('../../business-logic-layer/account-manager')


router.get('/', function (request, response) {
    response.render('loginPage.hbs')
})


router.get('/newDoctor', function (request, response) {
    response.render("addNewDoctor.hbs")
})

router.post('/newDoctor', function (request, response) {
    
    const user = {
    firstName : request.body.firstName,
    socialSecurityNumber : request.body.socialSecurityNumber,
    lastName : request.body.lastName
    }

    console.log(user)

    accountManager.GiveDoctorPrivilige(user,function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL DOKTOR")
        response.render("addNewDoctor.hbs", model)
    })
})



router.get('/bokning', function (request, response) {
    response.render('bookingPage.hbs')
    console.log("bookingpage")
})





module.exports = router