

module.exports = function createAccountManager({ accountRepository, accountValidator }) {

    return {
        getAllDoctors(callback) {
            accountRepository.getAllDoctors(callback)
        },

        getAllUsers(callback) {
            accountRepository.getAllUsers(callback)
        },

        getAccountNameFromId(id, callback) {
            accountRepository.getAccountNameFromId(id, callback)
        },

        createAccount(user, callback) {
            accountRepository.createAccount(user, callback)
        },

        GiveDoctorPrivilige(user, callback) {
            accountRepository.GiveDoctorPrivilige(user, callback)
        },

        getUserByID(id, callback) {
            accountRepository.getUserByID(id, callback)
        },

        checkLogInCredentials(user, callback) {
            accountValidator.checkLogInCredentials(user, callback)
        }

    }
}
