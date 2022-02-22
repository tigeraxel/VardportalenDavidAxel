const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)

var sessionStore = new RedisStore({
    client: redis.createClient({
        host: "localhost", 
        port: 6379
    })
})
module.exports = session({
    store: sessionStore,
    secret: '1234',
    saveUninitialized: false,
    resave: false,
    name: 'sessionId',
    cookie:{
        secure: false,
        httpOnly: false,
        maxAge: 30000
    }

})




