const express = require('express');


module.exports = function createBookingRouter({ bookingManager, accountManager, specialityManager, sessionValidator }) {

    const router = express.Router();

    router.use(sessionValidator.authenticateSession)

    router.get('/showall', function (request, response) {
        const session = request.session

        bookingManager.getBookings(session, function (errors, bookings) {
            const model = {
                errors: errors,
                bookings: bookings
            }
            response.render("bookingPage.hbs", model)
        })
    })

    router.get('/reserve', function (request, response) {
        bookingManager.getFreeBookings(function (errorsBookings, bookings) {

            specialityManager.getAllSpeciality(function (errorsSpecialitys, specialitys) {
                const model = {
                    errorsBookings: errorsBookings,
                    errorsSpecialitys: errorsSpecialitys,
                    bookings: bookings,
                    specialitys: specialitys
                }

                response.render("reserveBooking.hbs", model)
            })
        })
    })

    router.post('/reserve', function (request, response) {

        const bookingInfo = {
            bookingID: request.body.bookingID,
            userID: request.body.userID,
            message: request.body.message,
            CategoryID: request.body.CategoryID,
            covidQuestion: request.body.covidQuestion
        }

        bookingManager.updateBooking(bookingInfo, function (errors, bookingMessage) {
            if (errors.length > 0) {
                response.render("about.hbs")
            } else {
                response.render('ourDoctors.hbs', bookingMessage)
            }
        })
    })

    router.use(sessionValidator.authenticateDoctorSession)

    router.get('/create', function (request, response) {
        accountManager.getAllDoctors(function (errors, users) {
            const model = {
                errors: errors,
                users: users
            }
            response.render("createBooking.hbs", model)
        })
    })


    router.post('/create', function (request, response) {
        const bookingInfo = {
            time: request.body.time,
            date: request.body.date,
            doctorID: request.body.doctorID
        }
        bookingManager.createBooking(bookingInfo, function (errors, booking) {
            if (errors.length > 0) {
                response.render("about.hbs")
            } else {
                const model = {

                }
                response.render('ourDoctors.hbs')
            }
        })
    })

    return router
}