

module.exports = function createPostgresAccountRepository(){
    const db = require('./db')
    const users = db.users
    return {
        getAlldoctors(callback) {
            const errors = []
            users.findAll({
                where: {
                    doctorUserID: 1
                }
            }).then(doctors=>
                callback( [], doctors)
            ).catch(err => 
                console.log(err),
                callback( err, [])
            )
        },
        getAllUsers(callback){
            users.findAll()
            .then(foundUsers =>
                callback( [], foundUsers)
            ).catch(err => 
                console.log("error when fetching all users"),
                callback( err, [])
            )
        },
        getUserById(_userID, callback) {
            const user = users.findAll({
                where : {
                    userID: _userID
                }
            }).then(()=>{
                callback( [], user)
            }).catch( (err) => {
                console.log("could not find user with id "+ _userID)
                callback( err,[])
            })

        },
        getAccountNameFromId(_userID, callback) {
            const user = users.findAll({
                where: {
                    userID: _userID
                }
            }).then(()=>{
                callback( [], user)
            }).catch(()=>{
                console.log("error when fetching user with id "+ _userID)
                callback(err, [])
            })
        },
        createAccount(user,callback){
            const newUser = users.create({
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
                ]
            }).then(() =>{
                callback( [], newUser)
            }).catch((err) =>{
                console.log("error when creating user ")
                callback(err, [])
            })
        
        },
        GiveDoctorPrivilige(user, callback){
            const updatedUser = users.update({doctorUserID: 1},{
                where: {
                    socialSecurityNumber: user.socialSecurityNumber
                }
            }).then(()=>{
                callback([], updatedUser)
            }).catch((err) =>{
                console.log("Could not update doctorID for social number "+ user.socialSecurityNumber)
                callback( err, [])
            })
        },
        getLogInCredentials(user, callback){
            users.findAll({
                where: {
                    socialSecurityNumber: user.socialSecurityNumber,
                    userPassword: user.password
                }
            }).then(foundUser => 
                callback([], foundUser[0])
            ).catch(err =>
                console.log("Could not find user with social number "+user.socialSecurityNumber+" and password "+user.password),
                callback(err, [])
            )
        }
    }  
}