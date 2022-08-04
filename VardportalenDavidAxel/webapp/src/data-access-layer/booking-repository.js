

module.exports = function createBookingRepository() {
    const db = require('./db')
    
    return {
        getBookings(callback) {
            const query = "SELECT * FROM bookings"
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
        getBookingWithID(id,callback) {
            const query = "SELECT * FROM bookings WHERE bookingID = ?"
            const values = [id]

            db.query(query, values, function (error, booking) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], booking)
                }
            })
        },
        getFreeBookings(callback) {
            const query = "SELECT * FROM bookings WHERE patientID IS NULL "
            const values = []

            db.query(query, values, function (error, bookings) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    console.log("bookings efter query")
                    console.log(bookings)
                    callback([], bookings)
                }
            })
        },
        createBooking(bookingInfo, callback) {

            const query = "INSERT INTO bookings (appointmentTime, appointmentDate, doctorID) VALUES (?,?,?)"
            const values = [bookingInfo.time, bookingInfo.date, bookingInfo.doctorID]
            console.log(values)

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

            const query = "UPDATE bookings SET patientID = ?, messageFromPatient = ?, categoryID = ?, covidQuestion = ? WHERE bookingID = ?"
            const values = [bookingInfo.userID, bookingInfo.message, bookingInfo.CategoryID, bookingInfo.covidQuestion, bookingInfo.bookingID]
            console.log(bookingInfo.userID)

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
                    callback([], bookings)
                }
            })
        },
        getBookingsWithNames(callback) {
            const query = "select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID;"
            const values = []

            db.query(query, values, function (error, bookingsWithNames) {
                console.log(bookingsWithNames)
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], bookingsWithNames)
                }
            })
        },
        getBookingForUser(id, callback) {
            const query = "select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID WHERE bookings.patientID = ?;"
            const values = [id]

            db.query(query, values, function (error, userBooking) {
                console.log(userBooking)
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], userBooking)
                }
            })
        }
    }
}


/*
"SELECT employee.first_name, employee.last_name, call.start_time, call.end_time, call_outcome.outcome_text
FROM employee
INNER JOIN call ON call.employee_id = employee.id
INNER JOIN call_outcome ON call.call_outcome_id = call_outcome.id
ORDER BY call.start_time ASC;" */