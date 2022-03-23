async function loadLogin(){
	

	const loginInfo = {
		socialSecurityNumber: document.body.querySelector('#socialSecurityNumberLogin').value,
		password: document.body.querySelector('#passwordLogin').value
	}

	const response = await fetch("http://localhost:3000/api/login",
    {method: "POST",
    body: JSON.stringify(loginInfo)})	
	// TODO: Check status code and act accordingly!
	
	const user = await response.json()
	
	document.getElementById('login-id').innerText = user.id
	document.getElementById('login-firstName').innerText = user.firstName
	document.getElementById('login-lastName').innerText = user.lastName

	
}