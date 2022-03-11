


module.exports = function createAccountValidator({ accountRepository,postgresAccountRepository }){
    return {
        checkLogInCredentials(user, callback) {
            postgresAccountRepository.getLogInCredentials(user, function (errors, user) {
                if (errors.length > 0) {
                    console.error("Error i account validator")
                    console.error(errors)
                    callback(errors, [])
                }else {
                    callback([], user)
                }
            })
        }
    }
    
}


//eeeee