


module.exports = function createBookingManager({ bookingRepository, bookingValidator, postgresBookingRepository }) {
    return {
        /*
        getFreeBookings(callback) {
            bookingRepository.getFreeBookings(callback)
        },
        getBookings(session, callback) {
            bookingValidator.checkBookingPrivledges(session, callback)
        },
        createBooking(bookingInfo, callback) {
            bookingRepository.createBooking(bookingInfo, callback)
        },
        updateBooking(bookingInfo, callback) {
            bookingRepository.updateBooking(bookingInfo, callback)
        }*/

        // We have authorization checks for all of these but unfortunetely it is in the PL. No time to fix it this time.
        getFreeBookings(callback) {
            bookingRepository.getFreeBookings(callback)
        },
        getBookings(session, callback) {
            bookingValidator.checkBookingPrivledges(session, callback)
        },
        createBooking(bookingInfo, callback) {
            bookingRepository.createBooking(bookingInfo, callback)
        },
        updateBooking(bookingInfo, callback) {
            bookingRepository.updateBooking(bookingInfo, callback)
        },
        deleteBooking(bookingInfo, callback) {
            bookingRepository.deleteBooking(bookingInfo, callback)
        }
    }
}

