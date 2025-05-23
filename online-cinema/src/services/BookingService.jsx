
// src/services/BookingService.js
const BookingService = {
  saveBooking(movieId, bookingData) {
    const bookings = this.getBookings(movieId) || [];
    const bookingId = Date.now().toString();
    const newBooking = { ...bookingData, bookingId };
    bookings.push(newBooking);
    localStorage.setItem(`bookings_${movieId}`, JSON.stringify(bookings));
    return bookingId;
  },

  getBookings(movieId) {
    const bookings = localStorage.getItem(`bookings_${movieId}`);
    return bookings ? JSON.parse(bookings) : [];
  },

  getBookedSeats(movieId) {
    const bookings = this.getBookings(movieId);
    const bookedSeats = new Set();
    bookings.forEach((booking) =>
      booking.seats.forEach((seat) => bookedSeats.add(seat))
    );
    return Array.from(bookedSeats);
  },

  isSeatBooked(movieId, seatId) {
    const bookedSeats = this.getBookedSeats(movieId);
    return bookedSeats.includes(seatId);
  },
};

export default BookingService;
