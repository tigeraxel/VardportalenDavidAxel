
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
                console.log("lade till speciality " + _specialityName)
                callback([], newSpeciality)
            }).catch(err => {
                callback(err, null)
            })
        },

        getAllSpeciality(callback) {
            specialitys.findAll({
                raw: true
            })
            .then(allSpecialities => {
                callback([],allSpecialities)
            }).catch(err => {
                callback(err)
            })
        }
    }
}