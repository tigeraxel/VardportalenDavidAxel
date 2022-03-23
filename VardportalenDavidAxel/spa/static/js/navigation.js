//var booking = require(".booking-functions")

document.addEventListener('DOMContentLoaded', function () {

    const anchors = document.querySelectorAll('a')
    console.log(anchors)

    for (const anchor of anchors) {

        anchor.addEventListener('click', function (event) {
            event.preventDefault()

            const url = anchor.getAttribute('href')

            history.pushState(null, "", url)

            hideCurrentPage()
            console.log(url)
            showPage(url)

        })
    }

    showPage(location.pathname)

    const loginButton = document.body.querySelector('#loginButton')


    loginButton.addEventListener("click", function (event) {
        console.log("vill logga in")
    })


})


window.addEventListener('popstate', function () {

    hideCurrentPage()
    showPage(location.pathname)

})

function hideCurrentPage() {
    document.querySelector('.current-page').classList.remove('current-page')
}

function showPage(url) {

    let nextPageId

    switch (url) {

        case '/':
            nextPageId = 'start-page'
            break

        case '/login':
            nextPageId = 'login-page'
            const loginForm = document.getElementById("loginForm")
			loginForm.addEventListener("submit", function (event) {
				event.preventDefault()
                let url = "/login"
                Login()
			})
            break

        case '/register':
            nextPageId = 'register-page'
            const registerForm = document.getElementById("registerForm")
			registerForm.addEventListener("submit", function (event) {
				event.preventDefault()
                let url = "/register"
                Register()
			})
            break

        case '/booking':
            nextPageId = 'booking-page'
            const bookingForm = document.getElementById("bookingFormGet")
			bookingForm.addEventListener("submit", function (event) {
				event.preventDefault()
                var id = document.body.querySelector('#bookingIDget').value
                let url = "/booking/" + id
                history.pushState(null, "", url)
                hideCurrentPage()
                showPage(url)
			})
            break

        case '/reserveBooking':
            nextPageId = 'reserveBooking-page'
            break

        case '/deleteBooking':
            nextPageId = 'deleteBooking-page'
            break

        case '/createBooking':
            nextPageId = 'createBooking-page'
            const bookingFormCreate = document.getElementById("bookingFormCreate")
			bookingFormCreate.addEventListener("submit", function (event) {
				event.preventDefault()
                createBooking()
			})
            break

        default:
            if (url.startsWith("/booking/")) {
                const [empty, booking, id] = url.split("/")
                nextPageId = 'showBooking-page'
                loadBookingPage(id)
            } else {
                nextPageId = 'not-found-page'
            }

    }

    document.getElementById(nextPageId).classList.add('current-page')

}




