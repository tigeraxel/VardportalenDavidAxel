//functions for validation.
const bookingRepository = require("../data-access-layer/booking-repository")


module.exports = {
    checkBookingPrivledges(session, callback) {
        if(session.isDoctor || session.isAdmin){
            console.log("Hämtar alla bokningar")
            bookingRepository.getBookingsWithNames(function(err, bookings){

            })
        }
        else{
            console.log("Hämtar bokningar för användaren")
            session.userID
            //hämta bokningar för just den användarens userID
        }
    }
}