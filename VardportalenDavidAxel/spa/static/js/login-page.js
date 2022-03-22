async function loadLogin(){
	
	const response = await fetch("http://localhost:3000/api/login")
	
	// TODO: Check status code and act accordingly!
	
	const user = await response.json()
	
	document.getElementById('login-id').innerText = user.id
	document.getElementById('login-firstName').innerText = user.firstName
	document.getElementById('login-lastName').innerText = user.lastName

	
}