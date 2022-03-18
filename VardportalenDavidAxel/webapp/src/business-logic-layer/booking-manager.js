


module.exports = function createBookingManager({ bookingRepository, bookingValidator, postgresBookingRepository }) {
    return {
        /*getBookings(callback) {
            bookingRepository.getBookings(callback)
        },
        getFreeBookings(callback) {
            bookingRepository.getFreeBookings(callback)
        },
        getBookingsWithNames(session, callback) {
            console.log("i booking manager")
            console.log(session.isAdmin)
            bookingValidator.checkBookingPrivledges(session, callback)
        },
        createBooking(bookingInfo, callback) {
            bookingRepository.createBooking(bookingInfo, callback)
        },
        updateBooking(bookingInfo, callback) {
            bookingRepository.updateBooking(bookingInfo, callback)
        }*/
        getBookings(callback) {
            postgresBookingRepository.getBookings(callback)
        },
        getFreeBookings(callback) {
            postgresBookingRepository.getFreeBookings(callback)
        },
        getBookingsWithNames(session, callback) {
            console.log("i booking manager")
            bookingValidator.checkBookingPrivledges(session, callback)
        },
        createBooking(bookingInfo, callback) {
            postgresBookingRepository.createBooking(bookingInfo, callback)
        },
        updateBooking(bookingInfo, callback) {
            postgresBookingRepository.updateBooking(bookingInfo, callback)
        }
    }
}

