
const bcrypt = require('bcrypt');
const saltRounds = 10

module.exports = {

    async hashUserPassword(password) {
        const newPass = await bcrypt.hash(password, saltRounds)
        return newPass
    },

    async validateUserPassword(enteredPassword, hashedPassword) {
        const isValid = await bcrypt.compare(enteredPassword, hashedPassword)
        return isValid
    }
}
