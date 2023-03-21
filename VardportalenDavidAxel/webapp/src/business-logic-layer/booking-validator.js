


module.exports = function createBookingValidator({ bookingRepository, postgresBookingRepository }) {
    return {
        checkBookingPrivledges(session, callback) {
            if (session.isDoctor || session.isAdmin) {
                console.log("Inloggad som admin eller doktor")
                bookingRepository.getBookings(function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], bookings)
                    }
                })
            }
            else {
                bookingRepository.getBookingsForUser(session.userID, function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        console.log(bookings)
                        callback([], bookings)
                    }
                })
                //hämta bokningar för just den användarens userID
            }
        }
        /*
        checkBookingPrivledges(session, callback) {
            if (session.isDoctor || session.isAdmin) {
                postgresBookingRepository.getBookings(function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], bookings)
                    }
                })
            }
            else {
                postgresBookingRepository.getBookingsForUser(session.userID, function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], bookings)
                    }
                })
                //hämta bokningar för just den användarens userID
            }
        }
        */
    }
}