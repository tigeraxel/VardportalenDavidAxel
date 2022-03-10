const express = require('express')
const querystringConverter = require('sequelize-querystring-converter');





module.exports = function createAccountRouter({accountManager, sessionValidator}){

    const router = express.Router()

    router.post('/logIn', function (request, response) {

        const logInCredentials = {
            socialSecurityNumber: request.body.socialSecurityNumberLogin,
            password: request.body.passwordLogin
        }
    
        accountManager.checkLogInCredentials(logInCredentials, function (errors, user) {
            console.log("---------------")
            console.log(user)
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
                if (user.isDoctor == 1) {
                    request.session.isDoctor = true
                } else {
                    request.session.isDoctor = false
                }
                console.log(request.session)
                console.log("Precis loggat in")
                response.render('addNewDoctor.hbs')
            }
    
        })
    
    })
    router.post('/logout', function (request, response) {
        request.session.destroy()
        console.log("Precis loggat UT")
        response.redirect('/')
    })
    
    router.post('/register', function (request, response) {

        const { query } = request

        console.log(query)

        try{
            const criteria = querystringConverter.convert({query})
            console.log("-----------")
            console.log(criteria)
            console.log("-----------")
        }catch(err){
            console.error(err)
        }
    
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
            console.log(users.dataValues)
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
    return router 
}
