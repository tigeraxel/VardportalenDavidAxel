const FIRST_NAME_MIN_LENGTH = 3
const LAST_NAME_MIN_LENGTH = 3
const LAST_NAME_MAX_LENGTH = 30
const FIRST_NAME_MAX_LENGTH = 30
const hashManager = require('./hash-manager')

function validateUsernameAndPassword(newUser){
    const validationErrors = []
    if(newUser.firstName.length < FIRST_NAME_MIN_LENGTH){
        validationErrors.push("Firstname must be at least "+FIRST_NAME_MIN_LENGTH+" characters")
    }else if(newUser.lastName.length < LAST_NAME_MIN_LENGTH){
        validationErrors.push("Lastname must be at least "+LAST_NAME_MIN_LENGTH+" characters")
    }else if (newUser.firstName.length > FIRST_NAME_MAX_LENGTH){
        validationErrors.push("Lastname must be less than "+FIRST_NAME_MAX_LENGTH+" characters")
    }else if (newUser.lastName.length > LAST_NAME_MAX_LENGTH){
        validationErrors.push("Lastname must be less than "+LAST_NAME_MAX_LENGTH+" characters")
    }

    if(validationErrors.length == 0){
        return []
    }else{
        return validationErrors
    }
}

module.exports = function createAccountValidator({ accountRepository,postgresAccountRepository }){
    return {
        checkLogInCredentials(userLogInCredentials, callback) {
            accountRepository.getUserBySocialSecurityNumber(userLogInCredentials, async function (errors, foundUser) {
                if (errors.length > 0) {
                    console.error("Error i account validator")
                    callback(errors, [])
                }else {
                    const validPassword = await hashManager.validateUserPassword(userLogInCredentials.password, foundUser.userPassword)
                    if(validPassword){
                        callback([], foundUser)
                    }
                    else{
                        callback(["Incorrect username or password"])
                    }
                }
            })
        },
        validateAccountCredentials(newUser, callback) {
            const validationErrors = validateUsernameAndPassword(newUser)
            if(validationErrors.length == 0){
                callback([], newUser)
            }else{
                callback(validationErrors, [])
            }
        }
    }
    
}

