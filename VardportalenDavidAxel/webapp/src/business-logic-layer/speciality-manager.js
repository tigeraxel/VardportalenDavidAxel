


module.exports = function createSpecialityManager({ specialityRepository, specialityValidator, postgresSpecialityrepository }) {
    return {
        createSpeciality(specialityName, callback) {
            specialityRepository.createSpeciality(specialityName, callback)
        },

        getAllSpeciality(callback) {
            specialityRepository.getAllSpeciality(callback)
        }
    }
}

