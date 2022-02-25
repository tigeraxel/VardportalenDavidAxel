const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')
const sessionValidator = require('../../business-logic-layer/session-validator')
const session = require('../../data-access-layer/session-db')

const router = express.Router()

router.post('/logIn', function (request, response) {

    const logInCredentials = {
        socialSecurityNumber: request.body.socialSecurityNumberLogin,
        password: request.body.passwordLogin
    }

    accountManager.checkLogInCredentials(logInCredentials, function (errors, user) {
        //console.log(user)
        if (errors.length > 0) {
            response.render("about.hbs")
        } else {
            request.session.userID = user.userID
            request.session.isLoggedIn = true
            if (user.isAdmin == 1) {
                request.session.isAdmin = true
            }
            else {
                request.session.isAdmin = false
            }
            if(user.isDoctor == 1){
                request.session.isDoctor = true
            }else{
                request.session.isDoctor = false
            }
            console.log(request.session)
            console.log("Precis loggat in")
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
        response.render("loginPage.hbs", model)
    })
})

router.use(sessionValidator.authenticateDoctorSession)

router.get("/doctors", function (request, response) {
    accountManager.getAllDoctors(function (errors, users) {
        const model = {
            errors: errors,
            users: users
        }
        response.render("ourDoctors.hbs", model)
    })
})



//kollar så användaren har en session för att kunna komma åt sidorna nedanför.
router.use(sessionValidator.authenticateAdminSession)

router.get("/users", function (request, response) {
    accountManager.getAllUsers(function (errors, users) {
        const model = {
            errors: errors,
            users: users
        }
        response.render("ourUsers.hbs", model)
    })
})

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