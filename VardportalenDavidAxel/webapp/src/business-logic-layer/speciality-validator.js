//functions for validation.

module.exports = {
    authenticateAdminSession(request, response, next) {
        if (!request.session.isAdmin) {
            const error = new Error("You do not have admin privileges")
            next(error)
        }
        else {
            next()
        }
    }

}