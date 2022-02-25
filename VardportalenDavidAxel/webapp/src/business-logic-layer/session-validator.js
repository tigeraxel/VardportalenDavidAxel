
module.exports = {
    authenticateSession(request, response, next) {
        console.log("in session middleware")
        if(!request.session.isLoggedIn){
            const error = new Error("please log in")
            next(error)
        }
        else{
            next()
        }
    }
}

