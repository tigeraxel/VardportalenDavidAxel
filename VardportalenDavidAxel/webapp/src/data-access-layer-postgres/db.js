const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize('postgres', 'david', 'docker', {
    host: 'postgres-db',
    dialect: 'postgres'
})

const bookings = sequelize.define('bookings', {
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
    categoryID: {
        type: DataTypes.INTEGER,
    },
})
const users = sequelize.define('users', {
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
const specialitys = sequelize.define('specialitys', {
    specialityName: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})
console.log('innan hasOne !')
//users.hasOne(bookings, { foreignKey: { name: 'patientID' } })
//users.hasOne(bookings, { foreignKey: { name: 'doctorID' } } )
bookings.belongsTo(users, { as: 'patient' })
bookings.belongsTo(users, { as: 'doctor' })
//bookings.belongsTo(users, { foreignKey: 'userID' })
/*bookings.belongsTo(users)
users.hasOne(bookings, { foreignKey: 'userID'})
bookings.belongsTo(users)
*/
/*bookings.sync({force: true})
users.sync({force: true})
specialitys.sync({force: true})
*/

bookings.sync()
users.sync()
specialitys.sync()
const user = users.create({
    socialSecurityNumber: 1997,
    userPassword: '123',
    firstName: 'Axel',
    lastName: 'aasdasd',
    email: 'aasdasd@asdasd.com',
    phoneNumber: '123123123',
    isDoctor: 0,
    isAdmin: 1,
}, {
    fields: [
        'socialSecurityNumber',
        'userPassword',
        'firstName',
        'lastName',
        'email',
        'phoneNumber',
        'isDoctor',
        'isAdmin'
    ]
})


const booking =  bookings.create({
    appointmentTime: '06:20',
    appointmentDate: '12/12/12',
    covidQuestion: 'yes',
    messageFromPatient: 'Hej axel',
    categoryID: 1,
    patientUserID: 1,
    doctorUserID: 1,
}, {
    fields:
        [
            'appointmentTime',
            'appointmentDate',
            'covidQuestion',
            'messageFromPatient',
            'categoryID',
            'patientUserID',
            'doctorUserID'
        ]
})



const bok = bookings.findAll().then((booking)=>{
    console.log(booking)
}).catch((error)=>{
    console.log(error)
})


console.log('------------------------')
console.log(bookings === sequelize.model.bookings)
console.log('------------------------')

module.exports = sequelize

