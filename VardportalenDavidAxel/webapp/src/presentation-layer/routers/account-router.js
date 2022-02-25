const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const sessionValidator = require('../../business-logic-layer/session-validator')
const session = require('../../data-access-layer/session-db')

const router = express.Router()

router.post('/logIn', function (request, response) {
    console.log("I logIn function")
 
    const logInCredentials = {
        socialSecurityNumber: request.body.socialSecurityNumberLogin,
        password: request.body.passwordLogin
    }
    console.log(logInCredentials)
    accountManager.checkLogInCredentials(logInCredentials, function(errors, user){
        console.log(user)
        if(errors.length > 0) {
            response.render("about.hbs")
        }else{
            request.session.isLoggedIn = true
            console.log(request.session)
            response.render('addNewDoctor.hbs', user)
        }
        
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

    accountManager.createAccount(user, function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL användare")
        response.render("loginPage.hbs", model)
    })
})

//router.use(session)
//kollar så användaren har en session för att kunna komma åt sidorna nedanför.
//router.use(sessionValidator.authenticateSession, () => {console.log('kollat session')})

router.get('/newDoctor', function (request, response) {
    response.render("addNewDoctor.hbs")
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


module.exports = router