
const { sequelize } = require('./db')
const db = require('./db')
const bookings = db.bookings
const Users = db.users
const Specialitys = db.specialitys
const QueryTypes = db.Sequelize.QueryTypes



module.exports = function createPostgresBookingRepository() {
    return {
        getBookings(callback) {
            const allBookings = (bookings.findAll().then(() => {
                callback(allBookings)
            }).catch(err => {
                console.log("could not get all bookings..")
                callback(err)
            })).map(
                b => b.dataValues
            )
        },
        getFreeBookings() {
            const freeBookings = bookings.findAll({
                where: {
                    patientUserID: null,
                }
            }).then(() => {
                callback(freeBookings)
            }).catch(err => {
                console.log("could not find free bookings..")
                callback(err)
            })
        },
        createBooking(bookingInfo, callback) {
            const newBooking = bookings.create({
                appointmentTime: bookingInfo.time,
                appointmentDate: bookingInfo.date,
                covidQuestion: null,
                messageFromPatient: null,
                categoryID: null,
                doctorID: bookingInfo.doctorID,
                patientID: null,
            }, {
                fields:
                    [
                        'appointmentTime',
                        'appointmentDate',
                        'covidQuestion',
                        'messageFromPatient',
                        'categoryID',
                        'doctorID',
                        'patientID'
                    ]
            }).then(() => {
                callback(newBooking)
            }).catch((err) => {
                console.log("Could not create booking..")
                callback(err)
            })
        },
        updateBooking(bookingInfo, callback) {
            const updatedBooking = bookings.update({
                patientUserID: bookingInfo.userID,
                messageFromPatient: bookingInfo.message,
                specialitySpecialityID: bookingInfo.CategoryID
            }, {
                where: {
                    bookingID: bookingInfo.bookingID
                }
            }).then(() => {
                callback(updatedBooking)
            }).catch(err => {
                console.log("error when updating booking with bookingID " + bookingInfo.userID)
                callback(err)
            })

        },
        getBookingsWithNames(callback) {
            db.sequelize.query('select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID')
            .then(allBookingsWithNames, () => {
                callback([], allBookingsWithNames)
            }).catch(err, ()=>{
                console.log("error when fething all booking with names")
                callback(err, [])
            })
            
        },
        getBookingForUser(id,callback) {
            db.sequelize.query("select *, P.firstName as patientFirstName, P.lastName as patientLastName, D.firstName as doctorFirstName, D.lastName as doctorLastName from bookings join users D on bookings.doctorID = D.userID join users P on bookings.patientID = P.userID join specialitys c on bookings.categoryID = c.specialityID WHERE bookings.patientID = ?",{
                replacements: [id],
                type: QueryTypes.SELECT
            }).then(allBookingsForUser, ()=>{
                callback([],allBookingsForUser)
            }).catch(err, ()=>{
                console.log("error when fetching all bookings for user")
                callback(err, [])
            })
        },
    }
}

/******************** FIND ALL BOOKINGS **********************/ 
/*bookings.findAll({
                raw: true,
                attributes: [
                    'appointmentDate',
                    'appointmentTime',
                    'messageFromPatient',
                    'Users.firstName',
                    'Users.lastname',


                    //table.column
                ],
                include: [
                    {
                        model: Users, 
                        required: false, 
                    },
                    {
                        model: Specialitys,
                        required: false,
                    },
                ]
            }).then((foundBookings) => {
                callback(foundBookings)
            }).catch(err => {
                console.log("error when fetching bookingsWithNames...")
                callback(err)
            })*/

/******************** FIND ALL BOOKINGS FOR SPECIFIC USER **********************/

/*bookings.findAll({
                raw: true,
                attributes: [
                    ''
                ],
                include: [
                    {
                        model: Users,
                        required: false
                    },
                    {
                        model: Specialitys,
                        required: false,
                    }
                ]
            })*/