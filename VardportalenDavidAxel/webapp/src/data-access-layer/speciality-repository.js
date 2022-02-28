
module.exports = function createSpecialityRepository() {
    const db = require('./db')
    return {
        createSpeciality(specialityName, callback) {
            const query = 'INSERT INTO specialitys (specialityName) VALUES (?)'
            const values = specialityName
            console.log(specialityName)
            db.query(query, values, function (error, users) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], users)
                }
            })
        },
        getAllSpeciality(callback) {
            const query = "SELECT * FROM specialitys"
            const values = []

            db.query(query, values, function (error, specialitys) {
                if (error) {
                    callback(['databaseError'], null)
                }
                else {
                    callback([], specialitys)
                }
            })
        }
    }
}
