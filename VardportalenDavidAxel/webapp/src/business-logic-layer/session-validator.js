
module.exports = {
    authenticateSession(request, response, next) {
        console.log("in session middleware")
        if(!request.session){
        }
        else{
            next()
        }
    }
}