const FIRST_NAME_MIN_LENGTH = 3
const LAST_NAME_MIN_LENGTH = 3

function validateUsernameAndPassword(newUser){
    const validationErrors = []
    if(newUser.firstName < FIRST_NAME_MIN_LENGTH){
        validationErrors.push("Firstname must be at least "+FIRST_NAME_MIN_LENGTH+" characters")
    }else if(newUser.lastName < LAST_NAME_MIN_LENGTH){
        validationErrors.push("Lastname must be at least "+LAST_NAME_MIN_LENGTH+" characters")
    }

    if(validationErrors.length == 0){
        return []
    }else{
        return validationErrors
    }
}

module.exports = function createAccountValidator({ accountRepository,postgresAccountRepository }){
    return {
        checkLogInCredentials(user, callback) {
            postgresAccountRepository.getLogInCredentials(user, function (errors, user) {
                if (errors.length > 0) {
                    console.error("Error i account validator")
                    console.error(errors)
                    callback(errors, [])
                }else if(user.length == 0) {
                    callback(["Incorrect username or password"], null)
                }else {
                    callback([], user)
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


//eeeee