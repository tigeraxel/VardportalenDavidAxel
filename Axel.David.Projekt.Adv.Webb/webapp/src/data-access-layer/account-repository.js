const db = require('./db')

exports.getAllAccounts = function(callback){
    const query = "SELECT * FROM users"
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
    
