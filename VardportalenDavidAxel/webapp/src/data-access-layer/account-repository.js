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
    
