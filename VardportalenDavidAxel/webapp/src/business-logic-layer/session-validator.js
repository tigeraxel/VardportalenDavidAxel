
module.exports = function createSessionValidator() {
    return {
        authenticateSession(request, response, next) {
            if (!request.session.isLoggedIn) {
                const errors = ["Please log in first to access this page."]
                next(errors)
            }
            else {
                next()
            }
        },
        authenticateAdminSession(request, response, next) {
            let errors = []
            if (!request.session.isAdmin) {
                errors.push("You need admin privileges to access this page.")
                next(errors)
            }
            else {
                next()
            }
        },
        authenticateDoctorSession(request, response, next) {
            let errors = []
            if (!request.session.isDoctor && !request.session.isAdmin) {
                errors.push("You need doctor privileges to access this page.")
                next(errors)
            }
            else {
                next()
            }
        }
    }


}

