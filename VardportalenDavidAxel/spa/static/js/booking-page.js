async function loadBookingPage(id){
	
	const response = await fetch("http://localhost:3000/api/bookings/get/"+id)
	// TODO: Check status code and act accordingly!
	
	var booking = await response.json()
	booking = booking[0]
	console.log(booking)
	document.body.querySelector('#booking-message').innerText = booking.messageFromPatient
	document.body.querySelector('#booking-categoryID').innerText = booking.categoryID
	document.body.querySelector('#booking-time').innerText = booking.appointmentTime
    document.body.querySelector('#booking-date').innerText = booking.appointmentDate



	
}