async function Register(){

    var firstname = document.body.querySelector('#firstName').value
    var lastName = document.body.querySelector('#lastName').value
    var email = document.body.querySelector('#email').value
    var phoneNumber = document.body.querySelector('#phoneNumber').value
    var socialSecurityNumber = document.body.querySelector('#socialSecurityNumber').value
    var password = document.body.querySelector('#password').value
    const newAccount = {
        firstname: document.body.querySelector('#firstName').value,
        lastName: document.body.querySelector('#lastName').value,
        email: document.body.querySelector('#email').value,
        phoneNumber: document.body.querySelector('#phoneNumber').value,
        socialSecurityNumber: document.body.querySelector('#socialSecurityNumber').value,
        password:document.body.querySelector('#password').value
    }

    console.log(newAccount)

    const response = await fetch("http://localhost:3000/api/register/",
    {method: "POST",
    body: JSON.stringify(newAccount)})
	
	// TODO: Check status code and act accordingly!
	
	const returnFromFetch = await response.json()
    console.log(returnFromFetch)
    
    hideCurrentPage()
    showPage('/login')

	
}