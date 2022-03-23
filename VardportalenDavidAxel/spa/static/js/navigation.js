//var booking = require(".booking-functions")

let ACCESS_TOKEN = ""
let ACCOUNT_ID = ""
let IS_ADMIN = false
let IS_LOGGED_IN = false
let userID = ""

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
                loadLogin()
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



/* ########################## BOOKING ************* */


async function loadBookingPage(id) {

    const response = await fetch("http://localhost:3000/api/bookings/" + id , {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
    })
    // TODO: Check status code and act accordingly!

    var booking = await response.json()
    booking = booking[0]
    console.log(booking)
    document.body.querySelector('#booking-message').innerText = booking.messageFromPatient
    document.body.querySelector('#booking-categoryID').innerText = booking.categoryID
    document.body.querySelector('#booking-time').innerText = booking.appointmentTime
    document.body.querySelector('#booking-date').innerText = booking.appointmentDate


}


async function reserveBooking() {

    const bookingInfo = {
        bookingID: document.body.querySelector('#bookingIDreserve').value,
        userID: document.body.querySelector('#userID').value,
        message: document.body.querySelector('#message').value,
        CategoryID: document.body.querySelector('#CategoryID').value,
        covidQuestion: document.body.querySelector('#covidQuestion').value
    }

    console.log(bookingInfo)

    const response = await fetch("http://localhost:3000/api/bookings/reserve/" + bookingInfo.bookingID,
        {
            method: "POST",
            body: JSON.stringify(bookingInfo)
        })
    // TODO: Check status code and act accordingly!

    var booking = await response.json()
    console.log(booking)

}

async function createBooking() {

    const bookingInfo = {
        time: document.body.querySelector('#time').value,
        date: document.body.querySelector('#date').value,
        doctorID: document.body.querySelector('#doctorID').value
    }

    console.log(bookingInfo)

    const response = await fetch("http://localhost:3000/api/bookings/create",
        {
            method: "POST",
            body: JSON.stringify(bookingInfo)
        })
    // TODO: Check status code and act accordingly!

    var booking = await response.json()
    console.log(booking)

}


/* ########################## LOGIN ************* */


async function loadLogin() {


    const loginInfo = {
        socialSecurityNumber: document.getElementById('socialSecurityNumberLogin').value,
        password: document.getElementById('passwordLogin').value,
        grantType: "userPassword"
    }

    console.log(loginInfo)
    const response = await fetch("http://localhost:3000/api/login",
    {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		body: new URLSearchParams(loginInfo)
	})
    // TODO: Check status code and act accordingly!

    const responseBody = await response.json()
    //console.log(responseBody)
    //console.log(responseBody["accessToken"])

    ACCESS_TOKEN = responseBody.accessToken
    userId = responseBody.userInfo.userID
    //IS_ADMIN = responseBody.is_admin
    //IS_LOGGED_IN = true

    hideCurrentPage()
    //updateNav(IS_LOGGED_IN)
    showPage('/')

}


/* ########################## REGISTER ************* */


async function Register() {

    const newAccount = {
        firstname: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        socialSecurityNumber: document.getElementById('socialSecurityNumber').value,
        password: document.getElementById('password').value
    }

    console.log(newAccount)

    const response = await fetch("http://localhost:3000/api/register/",
        {
            method: "POST",
            body: JSON.stringify(newAccount)
        })

    // TODO: Check status code and act accordingly!

    const returnFromFetch = await response.json()
    console.log(returnFromFetch)

    hideCurrentPage()
    showPage('/login')


}