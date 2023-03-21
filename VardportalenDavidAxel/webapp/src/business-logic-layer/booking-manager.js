


module.exports = function createBookingManager({ bookingRepository, bookingValidator, postgresBookingRepository }) {
    return {
        /*
        getFreeBookings(callback) {
            bookingRepository.getFreeBookings(callback)
        },
        getBookingsWithNames(session, callback) {
            bookingValidator.checkBookingPrivledges(session, callback)
        },
        createBooking(bookingInfo, callback) {
            bookingRepository.createBooking(bookingInfo, callback)
        },
        updateBooking(bookingInfo, callback) {
            bookingRepository.updateBooking(bookingInfo, callback)
        }*/
        getFreeBookings(callback) {
            bookingRepository.getFreeBookings(callback)
        },
        getBookingsWithNames(session, callback) {
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

