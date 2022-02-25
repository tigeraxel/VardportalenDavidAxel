const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars') 
const redisClient = require('../data-access-layer/session-db')
const session = require('express-session')
let RedisStore = require('connect-redis')(session)

/*const redisClient = redis.createClient({
    legacyMode: true,
    host: 'session-db'
})*/

const app = express()

app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded())
app.set('views', path.join(__dirname, "views"))

app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: '1234',
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie:{
        secure: false,
        httpOnly: false,
        maxAge: 100000
    }
}))

app.use(function(request, response, next){
    response.locals.isAdmin = request.session.isAdmin
    response.locals.isLoggedIn = request.session.isLoggedIn
    next()
})

const variousRouter = require('./routers/various-routers')
const bookingRouter = require('./routers/booking-router')
const specialityRouter = require('./routers/speciality-router')
const accountRouter = require('./routers/account-router')
app.use('/', variousRouter)
app.use('/account', accountRouter)
app.use('/speciality', specialityRouter)
app.use('/bookings', bookingRouter)

app.use((error, request, response, next) => {
    response.render("loginPage.hbs", error)
})

app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
defaultLayout: 'main'
}))



app.listen(8080,function(){
    console.log("Up and running")
})