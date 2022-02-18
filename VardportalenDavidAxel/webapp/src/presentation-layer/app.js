const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')

const redis = require('redis')
let RedisStore = require('connect-redis')(session)


let redisClient = redis.createClient({ 
    host: 'localhost',
    port: 6379
})

const app = express()

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: '1234',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, 
        saveUninitialized: false,
        httpOnly: false, 
        maxAge: 1000 * 60 * 10 * 7
    }
}))

app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded())
app.set('views', path.join(__dirname, "views"))

const variousRouter = require('./routers/various-routers')
const bookingRouter = require('./routers/booking-router')
const specialityRouter = require('./routers/speciality-router')
const accountRouter = require('./routers/account-router')
app.use('/speciality', specialityRouter)
app.use('/bookings', bookingRouter)
app.use('/', variousRouter)
app.use('/account', accountRouter)




app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
defaultLayout: 'main'
}))



app.listen(8080,function(){
console.log("Up and running")
})