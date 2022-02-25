const express = require('express');
const bookingManager = require('../../business-logic-layer/booking-manager')
const bookingValidator = require('../../business-logic-layer/booking-validator')
const specialityManager = require('../../business-logic-layer/speciality-manager')
const sessionValidator = require('../../business-logic-layer/session-validator')


const router = express.Router();


router.use(sessionValidator.authenticateSession)

router.get('/showall', function (request, response) {
    const session = request.session
    console.log(session.isAdmin)
    bookingManager.getBookingsWithNames(session, function (errors, bookingsWithNames) {
        //console.log(bookingsWithNames)
        const model = {
            errors: errors,
            bookingsWithNames: bookingsWithNames
        }
        response.render("bookingPage.hbs", model)
    })
})

router.get('/reserve', function (request, response) {
    bookingManager.getFreeBookings(function(errorsBookings, bookings){
        specialityManager.getAllSpeciality(function(errorsSpecialitys,specialitys){
            const model = {
                errorsBookings: errorsBookings,
                errorsSpecialitys:errorsSpecialitys,
                bookings: bookings,
                specialitys:specialitys
            }

    response.render("reserveBooking.hbs", model)
        })
    })
})

router.post('/reserve', function(request, response){

    const bookingInfo = {
        bookingID: request.body.bookingID,
        userID: request.body.userID,
        message: request.body.message,
        CategoryID: request.body.CategoryID,
        covidQuestion: request.body.covidQuestion
    }

    bookingManager.updateBooking(bookingInfo,function(errors,bookingMessage){
        if(errors.length > 0) {
            console.log(errors)
            response.render("about.hbs")
        }else{
            response.render('ourDoctors.hbs', bookingMessage)
        }
    })
    console.log(bookingInfo)
})

router.use(sessionValidator.authenticateDoctorSession)

router.get('/create', function (request, response) {
    response.render("createBooking.hbs")
})


router.post('/create', function (request, response) {
    const bookingInfo = {
        time: request.body.time,
        date: request.body.date,
        doctorID: request.body.doctorID
    }
    bookingManager.createBooking(bookingInfo,function(errors,bookingMessage){
        if(errors.length > 0) {
            console.log(errors)
            response.render("about.hbs")
        }else{
            response.render('ourDoctors.hbs', bookingMessage)
        }
    })
})


module.exports = router