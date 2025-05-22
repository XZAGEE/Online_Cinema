
const BookingService = {
  saveBooking(movieId, bookingData) {
    const bookings = this.getBookings(movieId) || [];
    bookings.push(bookingData);
    localStorage.setItem(`bookings_${movieId}`, JSON.stringify(bookings));
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
};

export default BookingService;
