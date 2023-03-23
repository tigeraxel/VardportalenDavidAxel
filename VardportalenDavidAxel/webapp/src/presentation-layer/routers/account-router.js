const express = require('express')






module.exports = function createAccountRouter({accountManager, sessionValidator}){

    const router = express.Router()

    router.post('/logIn', function (request, response) {

        const logInCredentials = {
            socialSecurityNumber: request.body.socialSecurityNumberLogin,
            password: request.body.passwordLogin
        }
    
        accountManager.checkLogInCredentials(logInCredentials, function (errors, user) {

            if (errors.length > 0) {
                const model = {
                    errors: errors,
                }
                response.render('loginPage.hbs', model)
            } else {
                request.session.userID = user.userID
                request.session.isLoggedIn = true
                if (user.isAdmin == 1) {
                    request.session.isAdmin = true
                }
                else {
                    request.session.isAdmin = false
                }
                if (user.isDoctor == 1) {
                    request.session.isDoctor = true
                } else {
                    request.session.isDoctor = false
                }
                response.render('loggedInPage.hbs')
            }
    
        })
    
    })
    router.post('/logout', function (request, response) {
        request.session.destroy()
        response.redirect('/')
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
    router.get("/doctors", function (request, response) {
        accountManager.getAllDoctors(function (errors, users) {
            const model = {
                errors: errors,
                users: users
            }
            response.render("ourDoctors.hbs", model)
        })
    })
    router.use(sessionValidator.authenticateDoctorSession)
    

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
        const session = request.session

        accountManager.giveUserDoctorPrivilige(session,user, function (errors, text) {
            const model = {
                errors: errors,
                text: text
            }
            response.render("addNewDoctor.hbs", model)
        })
    })
    return router 
}
