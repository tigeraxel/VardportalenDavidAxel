async function loadBookingPage(id){
	
	const response = await fetch("http://localhost:3000/api/bookings/get/"+id)
	// TODO: Check status code and act accordingly!
	
	const booking = await response.json()
	
	console.log(booking)
	document.body.querySelector('#booking-message').innerText = booking.message
	document.body.querySelector('#booking-categoryID').innerText = booking.CategoryID
	document.body.querySelector('#booking-time').innerText = booking.appointmentTime
    document.body.querySelector('#booking-date').innerText = booking.appointmentDate

	document.getElementById("booking-time").innerText = "TJENAREEEEE"


	
}