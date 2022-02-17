const bookingRepository = require('../data-access-layer/booking-repository')
const bookingValidator = require('./booking-validator')


exports.getBookings = function(callback){
    bookingRepository.getBookings(callback)
}

exports.getFreeBookings = function(callback){
    bookingRepository.getFreeBookings(callback)
}

exports.getBookingsWithNames = function(callback){
    bookingRepository.getBookingsWithNames(callback)
}

exports.createBooking = function(bookingInfo,callback){
    bookingRepository.createBooking(bookingInfo,callback)
}

exports.updateBooking = function(bookingInfo,callback){
    bookingRepository.updateBooking(bookingInfo,callback)
}
