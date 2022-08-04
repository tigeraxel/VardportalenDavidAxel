


module.exports = function createAccountRepository() {
    const db = require('./db')
    
    return {

        getAllDoctors(callback) {
            const query = "SELECT * FROM users WHERE isDoctor = 1"
            const values = []

            db.query(query, values, function (error, doctors) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], doctors)
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

            db.query(query, values, function (error, user) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], user)
                }
            })
        },

        createAccount(user, callback) {
            const query = 'INSERT INTO users (socialSecurityNumber, userPassword, firstName, lastName, email, phoneNumber,isDoctor, isAdmin) VALUES (?,?,?,?,?,?,0,0)'
            const values = [user.socialSecurityNumber, user.password, user.firstName, user.lastName, user.email, user.phoneNumber]
            db.query(query, values, function (error, user) {
                console.log(error)
                if (error) {
                    callback(error, null)
                }
                else {
                    callback([], user)
                }
            })
        },

        giveUserDoctorPrivilige(user, callback) {
            const query = "UPDATE users SET isDoctor = '1' WHERE socialSecurityNumber = ? AND firstName = ? AND lastName = ?"
            const values = [user.socialSecurityNumber, user.firstName, user.lastName]
            db.query(query, values, function (error, user) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], user)
                }
            })

        },

        getLogInCredentials(user, callback) {
            const query = "SELECT * FROM users WHERE socialSecurityNumber = ?"
            const values = [user.socialSecurityNumber]
            db.query(query, values, function (error, userArray) {
                if (error) {
                    callback(["DatabaseError"], null)
                }else if(userArray.length > 0) {
                    callback([], userArray[0])
                }else {
                    callback(["wrong username or password", null])
                }
            })
        }

    }
}


