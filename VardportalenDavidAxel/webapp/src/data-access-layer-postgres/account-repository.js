

module.exports = function createPostgresAccountRepository(){
    const db = require('./db')
    const users = db.users
    return {
        getAllDoctors(callback) {
            users.findAll({
                where: {
                    isDoctor: true
                },
                raw: true
            }).then(doctors=>
                callback([], doctors)
            ).catch((err) => {
                callback( "databaseError", [])
            })
        },
        getAllUsers(callback){
            users.findAll({
                raw: true
            })
            .then(foundUsers =>
                callback( [], foundUsers)
            ).catch((err) => {
                callback( "databaseError", [])
            })
        },
        getUserById(_userID, callback) {
            const user = users.findAll({
                where : {
                    userID: _userID
                },
                raw: true
            }).then(()=>{
                callback( [], user)
            }).catch( (err) => {
                callback( "databaseError",[])
            })

        },

        createAccount(user,callback){
            users.create({
                socialSecurityNumber: user.socialSecurityNumber,
                userPassword: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                isDoctor: 0,
                isAdmin: 0,
            }, {
                fields: [
                    'socialSecurityNumber',
                    'userPassword',
                    'firstName',
                    'lastName',
                    'email',
                    'phoneNumber',
                    'isDoctor',
                    'isAdmin'
                ],
            }).then( newUser => {
                callback( [], newUser)
            }).catch((err) =>{
                if(err["name"] == "SequelizeUniqueConstraintError"){
                    callback(["Username is already taken"], [])
                }
                else{
                callback(["databaseError"], [])
                }
            })
        
        },
        giveUserDoctorPrivilige(user, callback){
            users.update({
                doctorUserID: 1
            },{
                where: {
                    socialSecurityNumber: user.socialSecurityNumber
                },
                raw: true
            }).then(updatedUser => {
                callback([], updatedUser)
            }).catch((err) => {
                callback( "databaseError", [])
            })
        },
        getUserBySocialSecurityNumber(user, callback){
            users.findAll({
                where: {
                    socialSecurityNumber: user.socialSecurityNumber,
                },
                raw: true
            }).then(foundUsers => {
                if(foundUsers != null){
                    callback([], foundUsers[0])
                }else{
                    callback([],null)
                }
            }).catch((err) => {
                callback("databaseError", [])
            })
        }
    }  
}