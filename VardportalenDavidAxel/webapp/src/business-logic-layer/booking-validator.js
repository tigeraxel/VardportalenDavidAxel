//functions for validation.
const bookingRepository = require("../data-access-layer/booking-repository")


module.exports = {
    checkBookingPrivledges(session, callback) {
        if(session.isDoctor || session.isAdmin){
            console.log("Hämtar alla bokningar")
            bookingRepository.getBookingsWithNames(function(errors, bookings){
                if(errors.length > 0){
                    callback(errors, [])
                }else{
                    callback([], bookings)
                }
            })
        }
        else{
            console.log("Hämtar bokningar för användaren")
            bookingRepository.getBookingForUser(session.userID,function(errors,bookings){
                if(errors.length > 0){
                    callback(errors, [])
                }else{
                    console.log(bookings)
                    callback([], bookings)
                }
            })
            //hämta bokningar för just den användarens userID
        }
    }
}