


module.exports = function createBookingValidator({ bookingRepository, postgresBookingRepository }) {
    return {
        checkBookingPrivledges(session, callback) {
            if (session.isDoctor || session.isAdmin) {
                bookingRepository.getBookingsWithNames(function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], bookings)
                    }
                })
            }
            else {
                bookingRepository.getBookingForUser(session.userID, function (errors, bookings) {
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
                postgresBookingRepository.getBookingsWithNames(function (errors, bookings) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], bookings)
                    }
                })
            }
            else {
                postgresBookingRepository.getBookingForUser(session.userID, function (errors, bookings) {
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