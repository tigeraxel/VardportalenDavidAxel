const express = require('express')
const accountManager = require('../../business-logic-layer/account-manager')

const router = express.Router()

router.get("/", function(request,response){
    accountManager.getAllAccounts(function(errors,users){
        const model = {
            errors: errors,
            users: users
        }
        response.render("showUsers.hbs",model)
    })
})







module.exports = router