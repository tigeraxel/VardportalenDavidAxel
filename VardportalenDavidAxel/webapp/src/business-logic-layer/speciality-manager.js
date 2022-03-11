


module.exports = function createSpecialityManager({ specialityRepository, specialityValidator, postgresSpecialityrepository }) {
    return {
        createSpeciality(specialityName, callback) {
            postgresSpecialityrepository.createSpeciality(specialityName, callback)
        },

        getAllSpeciality(callback) {
            postgresSpecialityrepository.getAllSpeciality(callback)
        }
    }
}

