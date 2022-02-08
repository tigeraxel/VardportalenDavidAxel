const { getAllAccounts } = require('../business-logic-layer/account-manager')
const { GiveDoctorPrivilige } = require('../business-logic-layer/account-manager')
const { createAccount } = require('../business-logic-layer/account-manager')

const db = require('./db')

exports.getAllAccounts = function(callback){
    const query = "SELECT * FROM users WHERE isDoctor = 1"
    const values = []

    db.query(query,values,function(error,users){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], users)
        }
    })
}

exports.getAccountNameFromId = function(id,callback){
    const query = "SELECT * FROM users WHERE userID = ?"
    const values = [id]

    db.query(query,values,function(error,users){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], users)
        }
    })
}

exports.createAccount = function(user,callback){
    const query = 'INSERT INTO users (socialSecurityNumber, userPassword, firstName, lastName, email, phoneNumber,isDoctor, isAdmin) VALUES (?,?,?,?,?,?,0,0)'
    const values = [user.socialSecurityNumber,user.password,user.firstName,user.lastName,user.email,user.phoneNumber]

    db.query(query,values,function(error,users){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], users)
        }
    })
}

exports.GiveDoctorPrivilige = function(user,callback){

    const query = "UPDATE users SET isDoctor = '1' WHERE socialSecurityNumber = ? AND firstName = ? AND lastName = ?"
    const values = [user.socialSecurityNumber,user.firstName,user.lastName]
    console.log("account repository " + user.socialSecurityNumber)

    db.query(query,values,function(error,users){
        if(error){
            callback(['databaseError'], null)
        }
        else{
            callback([], users)
        }
    })

}
    
