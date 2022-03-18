const express = require('express')


module.exports = function createApiRouter({accountManager, specialityManager, specialityValidator }){
    const router = express.Router()

    router.use(express.json())

    router.post("/login", function(request, response){
        
    })

    router.post("/register", function(request, response){
        
    })

    router.post("/speciality/create", function(request, response){

    })

    router.get("/specialitys", function(request, response){
        specialityManager.getAllSpeciality(function (errors, specialitys) {
            const model = {
                errors: errors,
                specialitys: specialitys
            }
            console.log(specialitys)
            console.log(errors)
            response.json(model)
        })
    })



    return router
}

