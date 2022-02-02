const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

const variousRouter = require('./routers/various-routers')
const accountRouter = require('./routers/account-router')
app.use('/', variousRouter)
app.use('/accounts', accountRouter)


app.use(express.static(__dirname + '/static'))

app.set('views', path.join(__dirname, "views"))

app.engine('hbs', expressHandlebars.engine({
    extname: 'hbs',
defaultLayout: 'main'
}))


app.get('/', function(request,response){
    response.render('loginPage.hbs')
    
})



app.get('/bokning', function(request,response){
    response.render('bookingPage.hbs')
    console.log("bookingpage")
})

app.listen(8080,function(){
console.log("Up and running")
})