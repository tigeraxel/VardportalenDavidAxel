const { getBookings } = require('../business-logic-layer/booking-manager')
const { getBookingsWithNames } = require('../business-logic-layer/booking-manager')

const db = require('./db')



exports.getBookings = function(callback){
    const query = "SELECT * FROM bookings"
    const values = []

    db.query(query,values,function(error,bookings){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], bookings)
        }
    })
}
 // halvklart
exports.getBookingsWithNames = function(callback){
    const query = "select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID;"
    const values = []

    db.query(query,values,function(error,bookingsWithNames){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], bookingsWithNames)
        }
    })
}
/*
"SELECT employee.first_name, employee.last_name, call.start_time, call.end_time, call_outcome.outcome_text
FROM employee
INNER JOIN call ON call.employee_id = employee.id
INNER JOIN call_outcome ON call.call_outcome_id = call_outcome.id
ORDER BY call.start_time ASC;" */