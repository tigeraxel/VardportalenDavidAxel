
module.exports = {
    authenticateSession(request, response, next) {
        console.log("in session middleware")
        if(!request.session){
            response.json('ingen session :(')
        }
        else{
            request.session.id = 'sessionId'
            //response.locals.session = request.session
            next()
        }
    }
}