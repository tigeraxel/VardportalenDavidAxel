const { createSpeciality } = require('../business-logic-layer/speciality-manager')

const db = require('./db')

exports.createSpeciality = function (specialityName, callback) {
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
}

exports.getAllSpeciality = function (callback) {
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