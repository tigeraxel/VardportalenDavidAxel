const accountRepository = require('../data-access-layer/account-repository')
//funkar om man kommenterar bort o sen startar om.....
const accountValidator = require('./account-validator')

exports.getAllAccounts = function(callback){
    accountRepository.getAllAccounts(callback)
}

exports.getAccountNameFromId = function(id,callback){
    accountRepository.getAccountNameFromId(id,callback)
}

exports.createAccount = function(user,callback){
    accountRepository.createAccount(user,callback)
}

exports.GiveDoctorPrivilige = function(user,callback){
    accountRepository.GiveDoctorPrivilige(user,callback)
}