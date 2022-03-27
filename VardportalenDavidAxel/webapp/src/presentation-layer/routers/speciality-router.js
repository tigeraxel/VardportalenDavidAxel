const express = require('express')


module.exports = function createSpecialityRouter({specialityManager, sessionValidator, specialityValidator}) {
    const router = express.Router()

    router.use(sessionValidator.authenticateAdminSession)

    router.get('/create', function (request, response) {
        specialityManager.getAllSpeciality(function (errors, specialitys) {
            const model = {
                errors: errors,
                specialitys: specialitys
            }
            response.render("createSpeciality.hbs", model)
        })
    })

    router.post('/create', function (request, response) {

        const specialityName = request.body.specialityName

        specialityManager.createSpeciality(specialityName, function (errors, text) {
            const model = {
                errors: errors,
                text: text
            }
            if(errors.length > 0){
                response.render("createSpeciality.hbs", model)
            }
            response.redirect("/speciality/create")
        })
    })

    return router
}
