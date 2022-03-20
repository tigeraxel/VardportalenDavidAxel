const express = require('express')


module.exports = function createApiRouter({accountManager, specialityManager, specialityValidator, bookingManager }){
    const router = express.Router()

    router.use(express.json())

    router.post("/login", function(request, response){

        const logInCredentials = {
            socialSecurityNumber: request.body.socialSecurityNumberLogin,
            password: request.body.passwordLogin
        }
        console.log("------------------")
        console.log(logInCredentials)
        accountManager.checkLogInCredentials(logInCredentials, function(errors, user){
            if(errors.length > 0){
                response.status(404).json(errors)
            }else{
                //skicka med webbtoken att inloggningen lyckades
                response.status(200).json(user)
            }
        })
    })

    router.post("/register", function(request, response){
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            socialSecurityNumber: request.body.socialSecurityNumber,
            password: request.body.password
        }
        accountManager.createAccount(newUser, function(errors, user){
            console.log(user)
            console.log(errors)
            if(errors[0] == 400) {
                errors[0] = "socialSecurityNumber is already taken"
                response.status(400).json(errors)
            }else if(errors[0]==500){
                response.status(500).end()
            }else{
                response.status(201).json(user)
            }
        })
    })
    router.get("/bookings/:id", function(request, response){
        const id = request.params.id

        bookingManager.getBookings(id, function (errors, bookings){
            
        })

    })
    //i GET
    //status code 200 om det lyckas
    //500 om du inte kan kommunicera med databasen

    //i CREATE
    //skickar tillbaka status 201 om det lyckas med location, och raden som skapades.
    //status code 500 = när man inte kan kommunicera med databasen (skcika bara tillbkaka kod 500)
    //status code 400 = validation errors (skicka tillbkaka error meddelandet in en array)

    //i DELETE
    //status code 204 för när vi lyckats ta bort en rad ur databasen (skicka inte med något i response)
    //skickar tillbaka 500 om det inte går att kommunicera med databasen
    //404 om raden som man försöker ta bort inte existerar.

    //i UPDATE
    //skickar tillbkaka 204 när vi lyckets uppdatera en rad i databasen
    //500 när vi inte kan kommunicera med databasen
    //400 om det sker ett validation error
    //404 om man försöker updatera ett id som inte finns

    router.post("/speciality/create", function(request, response){

    })

    router.get("/specialitys", function(request, response){
        specialityManager.getAllSpeciality(function (errors, specialitys) {
            const model = {
                specialitys: specialitys
            }
            console.log(specialitys)
            console.log(errors)
            if(specialitys.length > 0) {
                response.status(200).json(model)
            }else{
                response.status(500).end()
            }
        })
    })



    return router
}

