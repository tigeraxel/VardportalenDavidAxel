const express = require('express')
const expressHandlebars = require('express-handlebars')
const path = require('path')
const mariadb = require('mariadb');

/*const dbConnection = mariadb.createConnection({
    host: "db",
    port: "3306",
    user: "root",
    password: "abc123",
    database: "Axel.David.Projekt.Adv.Webb"
})
*/

const app = express()

app.engine('hbs', expressHandlebars.engine({
defaultLayout: 'main.hbs'
}))

app.set('views', path.join(__dirname, "views"))

app.get('/', function(request,response){
    response.render('homepage.hbs')
    
    /*dbConnection.query("SELECT * FROM humans",function(error,humans){
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
    */
})

app.get('/tjo', function(request,response){
    response.render('homepage.hbs')
    console.log("homepage")
})

app.listen(8080,function(){
console.log("Up and running")
})