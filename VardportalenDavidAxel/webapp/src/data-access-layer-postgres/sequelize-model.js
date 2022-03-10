
/******************************* BOOKINGS *********************** */
function Bookings(sequelize, DataTypes) {
    const Bookings = sequelize.define('Bookings', {
        bookingID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        appointmentTime: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        appointmentDate: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        covidQuestion: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        messageFromPatient: {
            type: DataTypes.TEXT,
        },
    })
    sequelize.sync()
    /*
    .then(() => {
        Bookings.create({
            appointmentTime: '07:20',
            appointmentDate: '2022-04-18',
            covidQuestion: 'yes',
            messageFromPatient: 'Har ont i arm',
            specialitySpecialityID: 1,
            patientUserID: 1,
            doctorUserID: 1,
        })
        Bookings.create({
            appointmentTime: '13:20',
            appointmentDate: '2022-04-22',
            covidQuestion: 'yes',
            messageFromPatient: 'Har ont i fot',
            specialitySpecialityID: 1,
            patientUserID: 1,
            doctorUserID: 1,
        })
    })
    */

    return Bookings
}

/******************************* USERS *********************** */
function Users(sequelize, DataTypes) {
    const Users = sequelize.define('Users', {
        userID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        socialSecurityNumber: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userPassword: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        firstName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        lastName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.TEXT,
        },
        isDoctor: {
            type: DataTypes.BOOLEAN,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
        }
    })
    sequelize.sync().then(() => {
        Users.create({
            socialSecurityNumber: 12,
            userPassword: '123',
            firstName: 'Axel',
            lastName: 'Tiger',
            email: 'Axel@FiskRensare.nu',
            phoneNumber: '1177',
            isDoctor: 1,
            isAdmin: 1
        }).catch(e => console.log(e))
        Users.create({
                socialSecurityNumber: 1997,
                userPassword: '123',
                firstName: 'David',
                lastName: 'wenn',
                email: 'David@SCAURONNEN.com',
                phoneNumber: '112',
                isDoctor: 0,
                isAdmin: 1
        }).catch(e => console.log(e))
    })
    return Users
}

/******************************* SPECIALITYS *********************** */
function Specialitys(sequelize, DataTypes) {
    const Specialitys = sequelize.define('Specialitys', {
        specialityID: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        specialityName: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    })
    sequelize.sync()
    /*
    .then(() => {
        Specialitys.create({
            specialityName: 'Vaccinering'
        }).catch(e => console.log(e))
        Specialitys.create({
            specialityName: 'Skada'
        }).catch(e => console.log(e))
    })
   */
    return Specialitys
}


/******************************* EXPORTS *********************** */
module.exports = {
    Bookings,
    Users,
    Specialitys
}