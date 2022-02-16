const express = require('express');
const bookingManager = require('../../business-logic-layer/booking-manager')
const bookingValidator = require('../../business-logic-layer/booking-validator');

const router = express.Router();


router.get('/', function (request, response) {
    bookingManager.getBookingsWithNames(function (errors, bookingsWithNames) {
        //console.log(bookingsWithNames)
        const model = {
            errors: errors,
            bookingsWithNames: bookingsWithNames
        }
        response.render("bookingPage.hbs", model)
    })
})

router.post('/newBooking', function(request, response){

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