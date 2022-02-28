


module.exports = function createAccountValidator({ accountRepository }){
    return {
        checkLogInCredentials(user, callback) {
            accountRepository.getLogInCredentials(user, function (errors, user) {
                if (errors.length > 0) {
                    console.error("Error i account validator")
                    console.error(errors)
                    callback(errors, [])
                } else {
                    callback([], user)
                }
            })
        }
    }
    
}


//eeeee