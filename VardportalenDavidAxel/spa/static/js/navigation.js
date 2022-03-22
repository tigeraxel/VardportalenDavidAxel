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
    const registerButton = document.body.querySelector('#registerButton')
    const getBookingButton = document.body.querySelector('#getBookingButton')


    loginButton.addEventListener("click", function (event) {
        console.log("vill logga in")
    })
    getBookingButton.addEventListener("click", function () {
        var id = document.body.querySelector('#bookingID').value
        let url = "/booking/" + id
        history.pushState(null, "", url)
        hideCurrentPage()
        showPage(url)
    })

    registerButton.addEventListener("click", function (event) {
        event.preventDefault()
        console.log("vill registrera sig")
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
            break

        case '/register':
            nextPageId = 'register-page'
            break

        case '/booking':
            nextPageId = 'booking-page'
            break

        case '/reserveBooking':
            nextPageId = 'reserveBooking-page'
            break

        case '/deleteBooking':
            nextPageId = 'deleteBooking-page'
            break

            case '/createBooking':
                nextPageId = 'createBooking-page'
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

