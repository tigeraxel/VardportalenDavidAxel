const express = require('express')

module.exports = function createVariousRouter() {

    const router = express.Router()

    router.get('/', function (request, response) {
        response.render('loginPage.hbs')
    })

    router.get('/about', function (request, response) {
        response.render('about.hbs')
    })
    router.get('/location', function (request, response) {
        response.render('location.hbs')
    })


    router.get('/register', function (request, response) {
        response.render("loginPage.hbs")
    })

    return router
}
