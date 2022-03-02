


module.exports = function createPostgresBookingRepository(){
    return {
        getBookings(){
            const bokning = (await bookings.findAll()).map(
                b => b.dataValues
            )
        },
        getFreeBookings(){
            
        },
        createBooking(){
            const booking = await bookings.create({
                appointmentTime: '06:20',
                appointmentDate: '12/12/12',
                covidQuestion: 'yes',
                messageFromPatient: 'Hej axel',
                categoryID: 1,
                doctorID: 2,
                patientID: 3
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
            })
        },
        updateBooking(){

        },
        getBookingsWithNames(){

        },
        getBookingForUser(){

        },

    }
}