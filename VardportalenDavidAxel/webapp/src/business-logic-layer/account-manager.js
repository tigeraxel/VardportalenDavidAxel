const accountRepository = require('../data-access-layer/account-repository')
//funkar om man kommenterar bort o sen startar om.....
const accountValidator = require('./account-validator')

module.exports = {

    getAllDoctors(callback){
        accountRepository.getAllDoctors(callback)
    },

    getAccountNameFromId(id,callback){
        accountRepository.getAccountNameFromId(id,callback)
    },

    createAccount(user,callback){
        accountRepository.createAccount(user,callback)
    },

    GiveDoctorPrivilige(user,callback){
        accountRepository.GiveDoctorPrivilige(user,callback)
    },

    checkLogInCredentials(user,callback){
        accountValidator.checkLogInCredentials(user,callback)
    }
}
