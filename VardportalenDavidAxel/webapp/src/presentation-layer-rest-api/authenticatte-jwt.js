
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY = "davidAxel"

function verifyToken(request,response, next) {
    const token = request.body.token || request.query.token || request.headers["x-access-token"]
    //const accessToken = request.get("authorization")
    //const tokenString = accessToken.substr("bearer".length)

    if(!accessToken){

        response.status(403).json(["A token is required to perform this operation"])
    }
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY)
    }catch(err){
        response.status(401).json(["Invalid token"])
    }
    next()
}

module.exports = verifyToken