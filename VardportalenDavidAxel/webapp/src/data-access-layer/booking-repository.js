

module.exports = function createBookingRepository() {
    const db = require('./db')

    return {

        getFreeBookings(callback) {
            const query = "SELECT * FROM bookings WHERE patientID IS NULL "
            const values = []

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], bookings)
                }
            })
        },
        createBooking(bookingInfo, callback) {

            const query = "INSERT INTO bookings (appointmentTime, appointmentDate, doctorID) VALUES (?,?,?)"
            const values = [bookingInfo.time, bookingInfo.date, bookingInfo.doctorID]

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], bookings)
                }
            })
        },
        updateBooking(bookingInfo, callback) {

            const query = "UPDATE bookings SET patientID = ?, message = ?, categoryID = ?, covidQuestion = ? WHERE bookingID = ?"
            const values = [bookingInfo.userID, bookingInfo.message, bookingInfo.CategoryID, bookingInfo.covidQuestion, bookingInfo.bookingID]

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], bookings)
                }
            })
        },
        deleteBooking(id, callback) {

            const query = "DELETE FROM bookings WHERE bookingID = ?"
            const values = [id]

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], null)
                }
            })
        },
        getBookings(callback) {
            const query = "select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID;"
            const values = []

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], bookings)
                }
            })
        },
        getBookingsForUser(id, callback) {
            const query = "select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID WHERE bookings.patientID = ?;"
            const values = [id]

            db.query(query, values, function (error, userBookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], userBookings)
                }
            })
        }
    }
}
