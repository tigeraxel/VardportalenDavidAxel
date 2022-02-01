const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const mysql2 = require('mysql2');
const app = express()
app.use(express.static(__dirname + '/static'))


var dbConnection = mysql2.createConnection({
    host: "db",
    port: "3306",
    user: "root",
    password: "abc123",
    database: "hello"
})


app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', function(request,response){
    response.render('loginPage.hbs')
    
})

app.get('/testdb', function(request,response){
    response.render('loginPage.hbs')
    dbConnection.query("SELECT * FROM users",function(error,users){
        if(error){
            console.log("error db")
        }
        else{
            console.log("Got users:")
            for(const user of users){
                console.log(user.firstName,user.lastName,user.socialSecurityNumber,user.isAdmin,user.isDoctor)
            }
        }
    }) 
    
})

app.get('/bokning', function(request,response){
    response.render('bookingPage.hbs')
    console.log("bookingpage")
})

app.listen(8080,function(){
console.log("Up and running")
})