const express = require('express')


module.exports = function createApiRouter({ accountRepository, accountValidator, postgresAccountRepository }){
    const router = express.Router()

    router.use(express.json())

    router.get("/logIn/API", function(request, response){
        
    })

    router.post("", function(request, response){

    })


    return router
}

