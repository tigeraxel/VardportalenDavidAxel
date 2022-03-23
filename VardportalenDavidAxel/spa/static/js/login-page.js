async function loadLogin(){
	

	const loginInfo = {
		socialSecurityNumber: document.getElementById('socialSecurityNumberLogin').value,
		password: document.getElementById('passwordLogin').value,
		grantType: "userPassword"
	}

	console.log(loginInfo)
	const response = await fetch("http://localhost:3000/api/login",
    {method: "POST",
    body: new URLSearchParams(loginInfo)})	
	// TODO: Check status code and act accordingly!
	
	const user = await response.json()
	
	console.log(user)
	
}