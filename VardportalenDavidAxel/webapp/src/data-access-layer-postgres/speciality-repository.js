
const db = require('./db')
const specialitys = db.specialitys

module.exports = function createPostgresSpecialityRepository(){
    return {
        createSpeciality(_specialityName, callback) {
            specialitys.create({
                specialityName: _specialityName,
            }
            ,{
                fields: [
                    'specialityName'
                ]
            },
            ).then(newSpeciality => {
                callback([], newSpeciality)
            }).catch(err => {
                callback(["databaseError"], null)
            })
        },

        getAllSpeciality(callback) {
            specialitys.findAll({
                raw: true
            })
            .then(allSpecialities => {
                callback([],allSpecialities)
            }).catch(err => {
                callback(["databaseError"], null)
            })
        }
    }
}