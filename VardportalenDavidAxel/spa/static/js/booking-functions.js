async function loadBookingPage(id){
	
	const response = await fetch("http://localhost:3000/api/booking/"+id)
	
	// TODO: Check status code and act accordingly!
	
	const booking = await response.json()
	
	document.getElementById('booking-id').innerText = booking.id
	document.getElementById('booking-message').innerText = booking.message
	document.getElementById('booking-categoryID').innerText = booking.CategoryID
    document.getElementById('booking-date').innerText = booking.date

	
}