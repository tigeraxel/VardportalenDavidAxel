


module.exports = function createAccountRepository() {
    const db = require('./db')
    
    return {

        getAllDoctors(callback) {
            const query = "SELECT * FROM users WHERE isDoctor = 1"
            const values = []

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })
        },
        getAllUsers(callback) {
            const query = "SELECT * FROM users"
            const values = []

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })
        },

        getUserByID(id, callback) {
            const query = "SELECT * FROM users where userID = ?"
            const values = [id]

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })
        },

        getAccountNameFromId(id, callback) {
            const query = "SELECT * FROM users WHERE userID = ?"
            const values = [id]

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })
        },

        createAccount(user, callback) {
            const query = 'INSERT INTO users (socialSecurityNumber, userPassword, firstName, lastName, email, phoneNumber,isDoctor, isAdmin) VALUES (?,?,?,?,?,?,0,0)'
            const values = [user.socialSecurityNumber, user.password, user.firstName, user.lastName, user.email, user.phoneNumber]

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    console.log("Detta får vi tillbaks")
                    console.log(users)
                    callback([], users)
                }
            })
        },

        GiveDoctorPrivilige(user, callback) {

            const query = "UPDATE users SET isDoctor = '1' WHERE socialSecurityNumber = ? AND firstName = ? AND lastName = ?"
            const values = [user.socialSecurityNumber, user.firstName, user.lastName]
            console.log("account repository " + user.socialSecurityNumber)

            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })

        },

        getLogInCredentials(user, callback) {
            const query = "SELECT * FROM users WHERE socialSecurityNumber = ? AND userPassword = ?"
            const values = [user.socialSecurityNumber, user.password]
            db.query(query, values, function (error, users) {
                userError = []
                if (users.length < 1) {
                    userError.push('User not found')
                }
                if (error || userError.length > 0) {
                    console.log(error)
                    callback(["DatabaseError"])
                } else {
                    callback([], users[0])
                }
            })
        }

    }
}


