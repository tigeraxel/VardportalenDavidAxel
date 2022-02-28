


module.exports = function createBookingManager({ bookingRepository, bookingValidator }) {
    return {
        getBookings(callback) {
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
        }
    }
}

