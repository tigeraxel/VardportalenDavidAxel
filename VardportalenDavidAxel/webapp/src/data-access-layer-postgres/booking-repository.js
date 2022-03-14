



module.exports = function createPostgresBookingRepository() {
    const db = require('./db')
    const bookings = db.bookings
    const Users = db.users
    const Specialitys = db.specialitys
    const Op = db.Sequelize.Op
    return {
        getBookings(callback) {
            (bookings.findAll()
                .then(allBookings =>
                    callback(allBookings)
                ).catch(err =>
                    console.log("could not get all bookings.."),
                    callback(err)
                ))
        },
        getFreeBookings(callback) {
            bookings.findAll({
                where: {
                    patientUserID: null,
                },
                raw: true
            }).then(freeBookings =>
                callback([], freeBookings)
            ).catch((error) => {
                console.log("could not find free bookings.."),
                    callback(error)
            })
        },
        createBooking(bookingInfo, callback) {
            bookings.create({
                appointmentTime: bookingInfo.time,
                appointmentDate: bookingInfo.date,
                covidQuestion: null,
                messageFromPatient: null,
                specialitySpecialityID: null,
                doctorUserID: bookingInfo.doctorID,
                patientUserID: null,
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
            }).then(newBooking =>
                callback(newBooking)
            ).catch((err) => {
                console.log("Could not create booking.."),
                    callback(err)
            })
        },
        updateBooking(bookingInfo, callback) {
            bookings.update({
                covidQuestion: bookingInfo.covidQuestion,
                messageFromPatient: bookingInfo.message,
                patientUserID: bookingInfo.userID,
                specialitySpecialityID: bookingInfo.CategoryID,
            },
                { where: { bookingID: bookingInfo.bookingID }, }
            ).then(updatedBooking =>
                callback([], updatedBooking)
            ).catch((err) => {
                console.log(err),
                    console.log("error when updating booking with bookingID " + bookingInfo.bookingID),
                    callback(err)
            })

        },
        getBookingsWithNames(callback) {
            bookings.findAll({
                where: {
                    patientUserID: {
                        [Op.not]: null,
                    }
                },
                raw: true
            }).then(foundBookings => {
                console.log("------------------------")
                console.log(foundBookings)
                callback([], foundBookings)
            }).catch((err)=>{
                callback(err)
            })
        },
        getBookingForUser(id, callback) {
            bookings.findAll({
                where: {
                    patientUserID: id
                },
                raw: true
            }).then(foundBookings => {
                console.log("---------------------------------")
                console.log(foundBookings)
                callback([],foundBookings)
            }).catch(err => {
                console.log("error when fetching bookingsForUserId...")
                callback(err)
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

/*
db.sequelize.query(`SELECT *, P."firstName" as "patientFirstName", P."lastName" as "patientLastName", D."firstName" as "doctorFirstName", D."lastName" as "doctorLastName" from Bookings join Users D on Bookings."doctorUserID" = D."userID" join Users P on Bookings."patientUserID" = P."userID" join Specialitys c on Bookings."specialitySpecialityID" = c."specialityID" WHERE Bookings."patientUserID" = ?`,{
    replacements: [id],
    type: db.Sequelize.QueryTypes.SELECT,
    raw: true,
}).then(allBookingsForUser=>
    callback([],allBookingsForUser)
).catch((err) => {
    console.log("error when fetching all bookings for user"),
    callback(err, [])
})




attributes: [
        'appointmentDate',
        'appointmentTime',
        'messageFromPatient',
        'Users.firstName',
        'Users.lastname',
    ],



db.sequelize.query(`select *, P."firstName" as "patientFirstName", P."lastName" as patientLastName, D."firstName" as "doctorFirstName", D."lastName" as "doctorLastName" from Bookings join Users D on Bookings."doctorUserID" = D."userID" join Users P on Bookings."patientUserID" = P."userID" join Specialitys c on Bookings."specialitySpecialityID" = c."specialityID"`, {
                raw: true,
                type: db.Sequelize.QueryTypes.SELECT
            }).then(allBookingsWithNames =>
                callback([], allBookingsWithNames)
            ).catch((err) => {
                console.log("error when fething all booking with names"),
                    callback(err, [])
            })
*/ 