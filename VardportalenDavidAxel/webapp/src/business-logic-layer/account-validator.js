const FIRST_NAME_MIN_LENGTH = 3
const LAST_NAME_MIN_LENGTH = 3
const PASSWORD_MIN_LENGTH = 3
const PASSWORD_MAX_LENGTH = 30
const LAST_NAME_MAX_LENGTH = 30
const FIRST_NAME_MAX_LENGTH = 30
const hashManager = require('./hash-manager')


function validateNamesAndPassword(newUser) {
    const validationErrors = []
    if (newUser.firstName.length < FIRST_NAME_MIN_LENGTH) {
        validationErrors.push("Firstname must be at least " + FIRST_NAME_MIN_LENGTH + " characters")
    }
    if (newUser.lastName.length < LAST_NAME_MIN_LENGTH) {
        validationErrors.push("Lastname must be at least " + LAST_NAME_MIN_LENGTH + " characters")
    }
    if (newUser.password.length < PASSWORD_MIN_LENGTH) {
        validationErrors.push("Password must be at least " + PASSWORD_MIN_LENGTH + " characters")
    }
    if (newUser.firstName.length > FIRST_NAME_MAX_LENGTH) {
        validationErrors.push("Lastname must be less than " + FIRST_NAME_MAX_LENGTH + " characters")
    }
    if (newUser.lastName.length > LAST_NAME_MAX_LENGTH) {
        validationErrors.push("Lastname must be less than " + LAST_NAME_MAX_LENGTH + " characters")
    }
    if (newUser.password.length > PASSWORD_MAX_LENGTH) {
        validationErrors.push("Password must be less than " + PASSWORD_MAX_LENGTH + " characters")
    }
    

    if (validationErrors.length == 0) {
        return []
    } else {
        return validationErrors
    }
}

module.exports = function createAccountValidator({ accountRepository, postgresAccountRepository }) {
    return {

        checkLogInCredentials(userLogInCredentials, callback) {

            accountRepository.getUserBySocialSecurityNumber(userLogInCredentials, async function (errors, foundUser) {
                if (errors.length > 0 || foundUser == null) {
                    if (foundUser == null) {
                        callback(["User not found"], null)
                    } else {
                        callback(errors, [])
                    }
                } else {
                    //hashManager compares enterd password with hashed password stored in the database and returns either true or false.
                    const isValidPassword = await hashManager.validateUserPassword(userLogInCredentials.password, foundUser.userPassword)

                    if (isValidPassword) {
                        callback([], foundUser)
                    }
                    else {
                        callback(["Incorrect username or password"], [])
                    }
                }
            })
        },
        validateAccountCredentials(user, callback) {
            const validationErrors = validateNamesAndPassword(user)
            if (validationErrors.length == 0) {
                accountRepository.getUserBySocialSecurityNumber(user, function (error, foundUser) {
                    if (error.length > 0) {
                        validationErrors.push("Database error")
                        callback(validationErrors)
                    } else if (foundUser) {
                        validationErrors.push("Social security number alrady exist")
                        callback(validationErrors)
                    } else {
                        callback([])
                    }
                })
            } else {
                callback(validationErrors)
            }
        },

        validateGiveUserDoctorPrivilige(session,user, callback) {
            console.log("inuti validateGiveUserDoctorPrivilige ")
            if (session.isAdmin) {
                console.log("VALIDATION FUNKADE ")

                accountRepository.giveUserDoctorPrivilige(user,function (errors, response) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], response)
                    }
                })
            }
        },

        /*
        checkLogInCredentials(userLogInCredentials, callback) {

            postgresAccountRepository.getUserBySocialSecurityNumber(userLogInCredentials, async function (errors, foundUser) {
                if(errors.length > 0 || foundUser == null) {
                    console.log("Sending back error")
                    if(foundUser==null){
                        callback(["User not found"],null)
                    }else{
                        callback(errors, [])
                    }
                }else {
                    //hashManager compares enterd password with hashed password stored in the database and returns either true or false.
                    const isValidPassword = await hashManager.validateUserPassword(userLogInCredentials.password, foundUser.userPassword)
                    if(isValidPassword){
                        callback([], foundUser)
                    }
                    else{
                        callback(["Incorrect username or password"],[])
                    }
                }
            })
        },
        validateAccountCredentials(user, callback) {
            const validationErrors = validateUsernameAndPassword(user)
            if(validationErrors.length == 0){
                postgresAccountRepository.getUserBySocialSecurityNumber(user, function (error, foundUser){
                    if(error.length > 0){
                        validationErrors.push("Database error")
                        callback(validationErrors)
                    }else if(foundUser){
                        validationErrors.push("Social security number alrady exist")
                        callback(validationErrors)
                    }else{
                        callback([])
                    }
                })
            }else{
                callback(validationErrors)
            }
        }

        validateGiveUserDoctorPrivilige(user, callback) {
            if (user.isDoctor || user.isAdmin) {
                postgresAccountRepository.giveUserDoctorPrivilige(function (errors, response) {
                    if (errors.length > 0) {
                        callback(errors, [])
                    } else {
                        callback([], response)
                    }
                })
            }
        }
        */
    }

}




    
