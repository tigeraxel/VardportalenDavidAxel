const express = require('express')
const specialityManager = require('../../business-logic-layer/speciality-manager')
const specialityValidator = require('../../business-logic-layer/speciality-validator')
const router = express.Router()



router.get('/newSpeciality', function (request, response) {
    specialityManager.getAllSpeciality(function (errors, specialitys) {
        const model = {
            errors: errors,
            specialitys: specialitys
        }
        console.log(specialitys)
        response.render("addNewSpeciality.hbs", model)
    })
})

router.post('/newSpeciality', function (request, response) {

    const specialityName = request.body.specialityName

    console.log(specialityName)

    specialityManager.createSpeciality(specialityName, function (errors, text) {
        const model = {
            errors: errors,
            text: text
        }
        console.log("LYCKADES LÄGGA TILL specialitys")
        response.redirect("/speciality/newSpeciality")
    })
})

module.exports = router