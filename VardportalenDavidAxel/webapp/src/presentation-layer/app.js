const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const redisClient = require('../data-access-layer/session-db')
const sequelize = require('../data-access-layer-postgres/db')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)

module.exports = function createApp({ accountRouter, bookingRouter, specialityRouter, variousRouter,apiRouter }) {

    return {
        start() {
            const app = express()

            app.use(express.static(__dirname + '/static'))
            app.use(express.urlencoded())
            app.set('views', path.join(__dirname, "views"))

            app.use(session({
                store: new RedisStore({ client: redisClient }),
                secret: '1234',
                saveUninitialized: false,
                resave: false,
                name: 'sessionId',
                cookie: {
                    secure: false,
                    httpOnly: false,
                    maxAge: 100000
                }
            }))

            app.use(function (request, response, next) {
                response.locals.isAdmin = request.session.isAdmin
                response.locals.isLoggedIn = request.session.isLoggedIn
                response.locals.userID = request.session.userID
                response.locals.isDoctor = request.session.isDoctor
                next()
            })

            app.use('/', variousRouter)
            app.use('/account', accountRouter)
            app.use('/speciality', specialityRouter)
            app.use('/bookings', bookingRouter)
            app.use('/api', apiRouter)

            app.use((error, request, response, next) => {
                console.log(error)
                console.log("erroororoeoreoor")
                model = {
                    errors: error
                }
                if(error.length > 0){
                    response.render("loginPage.hbs", model)
                }
            })

            app.engine('hbs', expressHandlebars.engine({
                extname: 'hbs',
                defaultLayout: 'main'
            }))

            app.listen(8080, function () {
                console.log("Up and running")
            })
        }
    }

}
