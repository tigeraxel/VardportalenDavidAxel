
module.exports = {
    authenticateSession(request, response, next) {
        if (!request.session.isLoggedIn) {
            const error = new Error("please log in")
            next(error)
        }
        else {
            next()
        }
    },
    authenticateAdminSession(request, response, next) {
        if (!request.session.isAdmin) {
            const error = new Error("You do not have admin privileges")
            next(error)
        }
        else {
            next()
        }
    },
    authenticateDoctorSession(request, response, next) {
        console.log("i doctor session validator")
        console.log(request.session)
        if (!request.session.isDoctor && !request.session.isAdmin) {
            const error = new Error("You do not have doctor privileges")
            next(error)
        }
        else {
            next()
        }
    }

}

