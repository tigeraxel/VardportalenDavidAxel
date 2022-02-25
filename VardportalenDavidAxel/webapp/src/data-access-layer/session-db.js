
const redis = require('redis')

const redisClient = redis.createClient({
    legacyMode: true,
    host: 'session-db'
})

module.exports = redisClient



