
const db = require('./db')

module.exports = function createPostgresAccountRepository(){
    return {
        getAlldoctors(){
            
        },
        getAllUsers(){

        },
        getUserById(){

        },
        getAccountNameFromId(){

        },
        createAccount(user,callback){

            const tempCreate = db.users.create({
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
            })
            if(error){
                callback(['databaseError'], null)
            }
            else {
                console.log("Detta får vi tillbaks")
                console.log(users)
                callback([], users)
            }


        },
        GiveDoctorPrivilige(){

        },
        getLogInCredentials(){

        }
    }  
}