const express = require('express');
const bookingManager = require('../../business-logic-layer/booking-manager')
const bookingValidator = require('../../business-logic-layer/booking-validator');

const router = express.Router();


router.get('/showall', function (request, response) {
    bookingManager.getBookingsWithNames(function (errors, bookingsWithNames) {
        //console.log(bookingsWithNames)
        const model = {
            errors: errors,
            bookingsWithNames: bookingsWithNames
        }
        response.render("bookingPage.hbs", model)
    })
})

router.get('/create', function (request, response) {
    response.render("createBooking.hbs")
})

router.get('/reserve', function (request, response) {
    bookingManager.getBookings(function(errors, bookings){
        const model = {
            errors: errors,
            bookings: bookings
        }

    response.render("reserveBooking.hbs", model)
    })
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

router.post('/reserve', function(request, response){

    request.body.no = Boolean(request.body.no)
    request.body.yes = Boolean(request.body.yes)

    if(request.body.no && !request.body.yes){
        console.log("Har inte haft corona")
    }
    else if(request.body.yes && !request.body.no){
        console.log("har haft corona!")
    }else{
        console.log("error, båda fälten får inte vara ifyllda")
    }
    console.log(request.body.yes)
    console.log(request.body.no)
    if(request.body.yes && request.body.no){
        console.log("send back error message!")
    }
    const booking = {
        
    }
})
module.exports = router