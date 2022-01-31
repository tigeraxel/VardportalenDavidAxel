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


dbConnection.query("SELECT * FROM humans",function(error,humans){
    if(error){
        console.log("error db")
    }
    else{
        console.log("Got humans:")
        for(const human of humans){
            console.log(human.name)
        }
    }
}) 



app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', function(request,response){
    response.render('loginPage.hbs')
    
})

app.get('/login', function(request,response){
    response.render('loginPage.hbs')
    
})

app.get('/bokning', function(request,response){
    response.render('bookingPage.hbs')
    console.log("bookingpage")
})

app.listen(8080,function(){
console.log("Up and running")
})