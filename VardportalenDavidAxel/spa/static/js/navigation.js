
document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault()

    const loginToggleButton = document.body.querySelector('#loginToggle')
    const loginButton = document.body.querySelector('#loginButton')

    const registerToggleButton = document.body.querySelector('#registerToggle')
    const registerButton = document.body.querySelector('#registerButton')

    const loginFormDiv = document.body.querySelector('#loginFormDiv')
    const membershipFormDiv = document.body.querySelector('#membershipFormDiv')
    function closeForms(){
        membershipFormDiv.style.display = "none"
        loginFormDiv.style.display = "none"
    }
    closeForms()



    loginToggleButton.addEventListener("click", function () {
        closeForms()
        loginFormDiv.style.display = "block"
    })
    registerToggleButton.addEventListener("click", function () {
        closeForms()
        membershipFormDiv.style.display = "block"
    })


    loginButton.addEventListener("click", function () {
        console.log("vill logga in")
    })

    registerButton.addEventListener("click", function () {
        console.log("vill registrera sig")
    })


    const url = anchor.getAttribute('href')

    history.pushState(null, "", url)

    hideCurrentPage()
    showPage(url)



})


