async function Register(){

    var firstname = document.body.querySelector('#firstName').value
    var lastName = document.body.querySelector('#lastName').value
    var email = document.body.querySelector('#email').value
    var phoneNumber = document.body.querySelector('#phoneNumber').value
    var socialSecurityNumber = document.body.querySelector('#socialSecurityNumber').value
    var password = document.body.querySelector('#password').value
    const newAccount = {
        firstname: firstname,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        socialSecurityNumber: socialSecurityNumber,
        password:password
    }

    const response = await fetch("http://localhost:3000/api/register",
    {body: JSON.stringify(newAccount)})
	
	// TODO: Check status code and act accordingly!
	
	const user = await response.json()
	
}