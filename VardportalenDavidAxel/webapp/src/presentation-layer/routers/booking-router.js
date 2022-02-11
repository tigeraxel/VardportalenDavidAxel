const express = require('express');
const bookingManager = require('../../business-logic-layer/booking-manager')
const bookingValidator = require('../../business-logic-layer/booking-validator');

const router = express.Router();


router.get('/', function (request, response) {
    console.log("fresh")
        bookingManager.getBookingsWithNames(function (errors, bookingsWithNames) {
            //console.log(bookingsWithNames)
            const model = {
                errors: errors,
                bookingsWithNames: bookingsWithNames
            }
            response.render("bookingPage.hbs", model)
        })
    })


module.exports = router