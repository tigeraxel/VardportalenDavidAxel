const bookingRepository = require('../data-access-layer/booking-repository')
const bookingValidator = require('./booking-validator')


exports.getBookings = function(callback){
    bookingRepository.getBookings(callback)
}

exports.getBookingsWithNames = function(callback){
    bookingRepository.getBookingsWithNames(callback)
}

exports.createBooking = function(bookingInfo,callback){
    bookingRepository.createBooking(bookingInfo,callback)
}