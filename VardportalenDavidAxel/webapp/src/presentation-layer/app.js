const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars') 
const session = require('../data-access-layer/session-db')

const app = express()


app.use(express.static(__dirname + '/static'))
app.use(express.urlencoded())
app.set('views', path.join(__dirname, "views"))

const variousRouter = require('./routers/various-routers')
const bookingRouter = require('./routers/booking-router')
const specialityRouter = require('./routers/speciality-router')
const accountRouter = require('./routers/account-router')
app.use('/', variousRouter)
app.use(session, () => {console.log("started session ")})
app.use('/account', accountRouter)
app.use('/speciality', specialityRouter)
app.use('/bookings', bookingRouter)



app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
defaultLayout: 'main'
}))



app.listen(8080,function(){
    console.log("Up and running")
})