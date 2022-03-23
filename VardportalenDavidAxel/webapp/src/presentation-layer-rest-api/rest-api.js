const express = require('express')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = 'davidAxel'
const HEADER = {
    algorithm: 'HS256',
    exp: 120000
}






module.exports = function createApiRouter({ accountManager, specialityManager, specialityValidator, bookingManager }) {

    const router = express.Router()

    router.use(express.json())

    router.use(express.urlencoded({
        extended: false,
    }))
    router.use(function (request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*")
        response.setHeader("Access-Control-Allow-Methods", "*")
        response.setHeader("Access-Control-Allow-Headers", "*")
        response.setHeader("Access-Control-Expose-Headers", "*")
        if (request.method == "OPTIONS") {
            return response.status(200).end()
        }
        next()
    })
    

    // router.use(function (request, response, next) {
    //     //grant type
    // })

    router.post("/login", function (request, response) {
        console.log("logIn")
        const logInCredentials = {
            grantType: request.body.grantType,
            socialSecurityNumber: request.body.socialSecurityNumber,
            password: request.body.password
        }
        console.log("WEB API LOGIN CREDENTIALS")
        console.log(logInCredentials)
        if (logInCredentials.grantType != "userPassword") {
            console.log("grantType not password")
            //skicka tillbaka error
        }
        console.log("------------------")
        console.log(logInCredentials)
        accountManager.checkLogInCredentials(logInCredentials, function (errors, user) {
            if (errors.length > 0) {
                response.status(404).json(errors)
            } else {
                const payload = {}
                if (user.isAdmin == 1) {
                    payload.isAdmin = true
                }
                else {
                    payload.isAdmin = false
                }
                if (user.isDoctor == 1) {
                    payload.isDoctor = true
                } else {
                    payload.isDoctor = false
                }
                payload.userID = user.userID
                payload.isLoggedIn = true
                payload.firstName = user.firstName
                jwt.sign(payload, JWT_SECRET_KEY, function (error, token) {
                    console.log(token)
                    if (error) {
                        response.status(401).json("Error when signing token")
                    } else {
                        response.status(200).json({
                            "accessToken": token,
                            userInfo: payload
                        })
                    }
                })
            }
        })
    })


    router.post("/register", function (request, response) {
        const newUser = {
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            email: request.body.email,
            phoneNumber: request.body.phoneNumber,
            socialSecurityNumber: request.body.socialSecurityNumber,
            password: request.body.password
        }
        console.log(newUser)
        accountManager.createAccount(newUser, function (errors, user) {
            console.log(user)
            console.log(errors)
            if (errors[0] == 400) {
                errors[0] = "socialSecurityNumber is already taken"
                response.status(400).json(errors)
            } else if (errors[0] == 500) {
                response.status(500).end()
            } else {
                response.status(201).json(user)
            }
        })
    })


    router.use(function (request, response, next) {
        //const token = request.body.token || request.query.token || request.headers["x-access-token"]
        // const authorizationHeader = request.header("Authorization")
        // const accessToken = authorizationHeader.substring("bearer ".length)
        console.log(request.headers.authorization)
        const accessToken = request.headers.authorization.split(' ')[1];

        if (!accessToken) {
            console.log("ingen access token")
            response.status(403).json(["Unauthorized user"])
        }
        console.log("verifierar token")
        jwt.verify(accessToken, JWT_SECRET_KEY, function (error, payload) {
            console.log("------------------")
            if (error) {
                console.log(error)
                response.sendStatus(403)
            }else {
                request.body.userInfo = payload
                next()
            }
        })
    })

    router.get("/bookings/:id", function (request, response) {
        console.log("fetching booking")
        const id = request.params.id

        bookingManager.getBookingWithID(id, function (errors, bookings) {
            console.log(bookings)
            console.log(errors)
            if (errors[0] == 400) {
                errors[0] = "bookings SQL WRONG is already taken"
                response.status(400).json(errors)
            } else if (errors[0] == 500) {
                response.status(500).end()
            } else {
                response.status(200).json(bookings)
            }
        })
    })


    router.post("/bookings/create", function (request, response) {

        const bookingInfo = {
            time: request.body.time,
            date: request.body.date,
            doctorID: request.body.doctorID
        }
        bookingManager.createBooking(bookingInfo, function (errors, booking) {
            console.log(booking)
            console.log(errors)
            if (errors[0] == 400) {
                errors[0] = "SQL WRONG is already taken"
                response.status(400).json(errors)
            } else if (errors[0] == 500) {
                response.status(500).end()
            } else {
                response.status(201).json(booking)
            }
        })
    })


    router.post("/bookings/delete/:id", function (request, response) {
        const bookingidID = request.params.id

        bookingManager.deleteBooking(bookingidID, function (errors, booking) {
            console.log(booking)
            console.log(errors)
            if (errors[0] == 400) {
                errors[0] = "SQL WRONG is already taken"
                response.status(400).json(errors)
            } else if (errors[0] == 500) {
                response.status(500).end()
            } else {
                response.status(201).json(booking)
            }
        })
    })


    router.post("/bookings/reserve/:id", function (request, response) {
        const bookingID = request.params.id

        const bookingInfo = {
            bookingID: bookingID,
            userID: request.body.userID,
            message: request.body.message,
            CategoryID: request.body.CategoryID,
            covidQuestion: request.body.covidQuestion
        }

        bookingManager.updateBooking(bookingInfo, function (errors, booking) {
            console.log(booking)
            console.log(errors)
            if (errors[0] == 400) {
                errors[0] = "SQL WRONG is already taken"
                response.status(400).json(errors)
            } else if (errors[0] == 500) {
                response.status(500).end()
            } else {
                response.status(201).json(booking)
            }
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

    router.post("/speciality/create", function (request, response) {

    })

    router.get("/specialitys", function (request, response) {
        specialityManager.getAllSpeciality(function (errors, specialitys) {
            const model = {
                specialitys: specialitys
            }
            console.log(specialitys)
            console.log(errors)
            if (specialitys.length > 0) {
                response.status(200).json(model)
            } else {
                response.status(500).end()
            }
        })
    })


    return router
}


