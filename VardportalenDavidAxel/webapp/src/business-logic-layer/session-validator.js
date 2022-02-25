
module.exports = {
    authenticateSession(request, response, next) {
        if (!request.session.isLoggedIn) {
            const errors = ["please log in"]
            next(errors)
        }
        else {
            next()
        }
    },
    authenticateAdminSession(request, response, next) {
        if (!request.session.isAdmin) {
            const errors = ["You do not have admin privileges"]
            next(errors)
        }
        else {
            next()
        }
    },
    authenticateDoctorSession(request, response, next) {
        console.log("i doctor session validator")
        console.log(request.session)
        if (!request.session.isDoctor && !request.session.isAdmin) {
        
            const errors = ["You dont have Admin Rights"]
            next(errors)
        }
        else {
            next()
        }
    }

}

