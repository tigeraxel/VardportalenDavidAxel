
const bcrypt = require('bcrypt');
const saltRounds = 10

module.exports = {

    async hashUserPassword(password) {
        console.log("hejehjehj")
        const newPass = await bcrypt.hash(password, saltRounds)
        return newPass
    },

    async validateUserPassword(enteredPassword, hashedPassword) {
        const error = []
        console.log("-----------------")
        console.log(enteredPassword)
        console.log(hashedPassword)
        const isValid = bcrypt.compare(enteredPassword, hashedPassword)
        if(isValid){
            return true
        }else{
            return false
        }
    }
}
