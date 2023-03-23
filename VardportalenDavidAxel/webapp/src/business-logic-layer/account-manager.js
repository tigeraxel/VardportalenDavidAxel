const hashManager = require('./hash-manager');

module.exports = function createAccountManager({ accountRepository, accountValidator, postgresAccountRepository  }) {

    return {

        getAllDoctors(callback) {
            accountRepository.getAllDoctors(callback)
        },

        getAllUsers(callback) {
            accountRepository.getAllUsers(callback)
        },

        createAccount(user, callback) {
            console.log("I account manager create account")
            accountValidator.validateAccountCredentials(user, async function(validationErrors){
                if(validationErrors.length == 0){
                    hashedPassword = await hashManager.hashUserPassword(user.password)
                    user.password = hashedPassword
                    accountRepository.createAccount(user, callback)
                }else{
                    callback(validationErrors,[])
                }
            })
        },

        giveUserDoctorPrivilige(session,user, callback) {
            console.log("inuti giveUserDoctorPrivilige ")
            accountValidator.validateGiveUserDoctorPrivilige(session,user, callback)
        },

        getUserByID(id, callback) {
            accountRepository.getUserByID(id, callback)
        },

        checkLogInCredentials(user, callback) {
            accountValidator.checkLogInCredentials(user, callback)
        }
        

        /*
        getAllDoctors(callback) {
            postgresAccountRepository.getAllDoctors(callback)
        },

        getAllUsers(callback) {
            postgresAccountRepository.getAllUsers(callback)
        },

        getAccountNameFromId(id, callback) {
            postgresAccountRepository.getAccountNameFromId(id, callback)
        },

        createAccount(user, callback) {
            accountValidator.validateAccountCredentials(user, async function(validationErrors, newUser){
                if(validationErrors.length == 0){
                    hashedPassword = await hashManager.hashUserPassword(user.password)
                    user.password = hashedPassword
                    postgresAccountRepository.createAccount(user, callback)
                }else{
                    callback(validationErrors, [])
                }
            })
        },

        giveUserDoctorPrivilige(user, callback) {
            postgresAccountRepository.giveUserDoctorPrivilige(user, callback)
        },

        getUserByID(id, callback) {
            postgresAccountRepository.getUserByID(id, callback)
        },

        checkLogInCredentials(user, callback) {
            accountValidator.checkLogInCredentials(user, callback)
        }
        */
    }
}
