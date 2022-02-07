const specialityRepository = require('../data-access-layer/speciality-repository')
const specialityalidator = require('./speciality-validator')


exports.createSpeciality = function(specialityName,callback){
    specialityRepository.createSpeciality(specialityName,callback)
}


exports.getAllSpeciality = function(callback){
    specialityRepository.getAllSpeciality(callback)
}
