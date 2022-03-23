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


async function reserveBooking(){

	const bookingInfo = {
		bookingID: document.body.querySelector('#bookingIDreserve').value,
		userID: document.body.querySelector('#userID').value,
		message: document.body.querySelector('#message').value,
		CategoryID: document.body.querySelector('#CategoryID').value,
		covidQuestion: document.body.querySelector('#covidQuestion').value
	}

	console.log(bookingInfo)

	const response = await fetch("http://localhost:3000/api/bookings/reserve/" + bookingInfo.bookingID,
    {method: "POST",
    body: JSON.stringify(bookingInfo)})
	// TODO: Check status code and act accordingly!
	
	var booking = await response.json()
	console.log(booking)

}

async function createBooking(){

	const bookingInfo = {
		time: document.body.querySelector('#time').value,
		date: document.body.querySelector('#date').value,
		doctorID: document.body.querySelector('#doctorID').value
	}

	console.log(bookingInfo)

	const response = await fetch("http://localhost:3000/api/bookings/create" ,
    {method: "POST",
    body: JSON.stringify(bookingInfo)})
	// TODO: Check status code and act accordingly!
	
	var booking = await response.json()
	console.log(booking)

}