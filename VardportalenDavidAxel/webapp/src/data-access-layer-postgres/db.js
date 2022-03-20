const Sequelize = require("sequelize");


console.log("Skapar sequelize connection")
/*
connectionFound = setInterval(() => {
    try {
        clearInterval(connectionFound)

    } catch (e) {
        console.log('Error! could not find sequelize connection')
    }
}, 3000)
*/

/*const sequelize = new Sequelize("postgres://kalle:docker@postgres-db:5432/postgres")*/


const sequelize = new Sequelize('postgres', 'kalle', 'docker', {
    host: 'postgres-db',
    dialect: 'postgres',
})


sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.")
}).catch(err => {
    console.log("Unable to connect to the database:" + err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
/***************************  CREATE TABLES ***************** */

db.users = require("./sequelize-model").Users(sequelize, Sequelize)
db.specialitys = require("./sequelize-model").Specialitys(sequelize, Sequelize)
db.bookings = require("./sequelize-model").Bookings(sequelize, Sequelize)


/*************************** CREATE RELATIONS ***************** */


db.bookings.belongsTo(db.users, { as: 'patient' })
db.bookings.belongsTo(db.users, { as: 'doctor' })
db.bookings.belongsTo(db.specialitys, { as: 'speciality' })

module.exports = db
/*************************** FIND DATA ***************** */
function tempQuerys() {
    const showUsers = db.users.findAll().then((user) => {
        console.log(user)
    }).catch((error) => {
        console.log(error)
    })

    const showBookings = db.bookings.findAll().then((booking) => {
        console.log(booking)
    }).catch((error) => {
        console.log(error)
    })

    const showSpecialitys = db.specialitys.findAll().then((speciality) => {
        console.log(speciality)
    }).catch((error) => {
        console.log(error)
    })
}
// tempQuerys()
// Ta bort kommentar ovan för att se all data


