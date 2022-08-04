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
            accountValidator.validateAccountCredentials(user, async function(validationErrors, newUser){
                if(validationErrors.length == 0){
                    hashedPassword = await hashManager.hashUserPassword(newUser.password)
                    newUser.password = hashedPassword
                    accountRepository.createAccount(newUser, callback)
                }else{
                    callback(validationErrors, [])
                }
            })
        },

        giveUserDoctorPrivilige(user, callback) {
            accountRepository.giveUserDoctorPrivilige(user, callback)
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
            accountValidator.validateAccountCredentials(user, function(validationErrors, newUser){
                if(validationErrors.length == 0){
                    console.log("Försöker registrera användare!")
                    postgresAccountRepository.createAccount(user, callback)
                }else{
                    callback(validationErrors, [])
                }
            })
        },

        GiveDoctorPrivilige(user, callback) {
            postgresAccountRepository.GiveDoctorPrivilige(user, callback)
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
