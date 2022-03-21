//var booking = require(".booking-functions")

document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault()

    const loginToggleButton = document.body.querySelector('#loginToggle')
    const loginButton = document.body.querySelector('#loginButton')
    const bookingButton = document.body.querySelector('#bookingButton')

    const registerToggleButton = document.body.querySelector('#registerToggle')
    const registerButton = document.body.querySelector('#registerButton')
    const bookingToggleButton = document.body.querySelector('#bookingToggle')

    const loginFormDiv = document.body.querySelector('#loginFormDiv')
    const membershipFormDiv = document.body.querySelector('#membershipFormDiv')
    const bookingFormDiv = document.body.querySelector('#bookingFormDiv')



    function closeForms(){
        membershipFormDiv.style.display = "none"
        loginFormDiv.style.display = "none"
        bookingFormDiv.style.display = "none"
    }
    closeForms()



    bookingToggleButton.addEventListener("click", function () {
        closeForms()
        bookingFormDiv.style.display = "block"
    })
    registerToggleButton.addEventListener("click", function () {
        closeForms()
        membershipFormDiv.style.display = "block"
    })
    loginToggleButton.addEventListener("click", function () {
        closeForms()
        loginFormDiv.style.display = "block"
    })


    loginButton.addEventListener("click", function (event) {
        event.preventDefault()

        console.log("vill logga in")
    })
    bookingButton.addEventListener("click", function (event) {
        event.preventDefault()

        console.log("vill få bokning")
        document.body.querySelector('#booking-time').innerText = "17.00"
        
        var id = document.body.querySelector('#bookingID').value
        loadBookingPage(id)

    })

    registerButton.addEventListener("click", function (event) {
        event.preventDefault()

        console.log("vill registrera sig")
    })



    history.pushState(null, "", url)

    hideCurrentPage()
    showPage(url)



})


