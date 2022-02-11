const specialityRepository = require('../data-access-layer/speciality-repository')
const specialityalidator = require('./speciality-validator')


module.exports = {
    createSpeciality(specialityName, callback){
        specialityRepository.createSpeciality(specialityName,callback)
    },

    getAllSpeciality(callback){
        specialityRepository.getAllSpeciality(callback)
    }
}

