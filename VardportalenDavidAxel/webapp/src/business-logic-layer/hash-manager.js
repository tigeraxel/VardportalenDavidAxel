
const bcrypt = require('bcrypt');
const saltRounds = 10

module.exports = {

    async hashUserPassword(password) {
        const newPass = await bcrypt.hash(password, saltRounds)
        return newPass
    },

    async validateUserPassword(enteredPassword, hashedPassword) {
        const error = []
        const isValid = bcrypt.compare(enteredPassword, hashedPassword)
        if(isValid){
            return true
        }else{
            return false
        }
    }
}
