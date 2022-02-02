const mysql2 = require('mysql2')

var dbConnection = mysql2.createConnection({
    host: "db",
    port: "3306",
    user: "root",
    password: "abc123",
    database: "hello"
})

module.exports = dbConnection