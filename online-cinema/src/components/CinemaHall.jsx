
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingService from '../services/BookingService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CinemaHall = () => {
  const { id } = useParams();
  const rows = 5;
  const seatsPerRow = 10;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const seats = BookingService.getBookedSeats(id);
    setBookedSeats(seats);
  }, [id]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (!bookedSeats.includes(seatId)) {
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((id) => id !== seatId)
          : [...prev, seatId]
      );
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Ім’я обов’язкове';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обов’язковий';
    if (!formData.email.trim()) {
      newErrors.email = 'Емейл обов’язковий';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Невірний формат емейлу';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && selectedSeats.length > 0) {
      const bookingData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        seats: selectedSeats,
        timestamp: new Date().toISOString(),
      };
      BookingService.saveBooking(id, bookingData);
      setSelectedSeats([]);
      setFormData({ name: '', phone: '', email: '' });
      setBookedSeats(BookingService.getBookedSeats(id));
      toast.success('Бронювання успішно збережено!');
    } else {
      toast.error('Заповніть усі поля коректно!');
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const seatId = `${row}-${seat}`;
        rowSeats.push(
          <div
            key={seatId}
            className={`seat ${
              bookedSeats.includes(seatId) ? 'booked' : selectedSeats.includes(seatId) ? 'selected' : 'available'
            }`}
            onClick={() => toggleSeat(row, seat)}
          >
            {seat}
          </div>
        );
      }
      seats.push(
        <div key={row} className="seat-row">
          Ряд {row}: {rowSeats}
        </div>
      );
    }
    return seats;
  };

  return (
    <div className="cinema-hall">
      <h2>Вибір місць</h2>
      <div className="seats-grid">{renderSeats()}</div>
      <div className="booking-form">
        <h3>Введіть дані для бронювання</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Ім’я"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <input
              type="text"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Емейл"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <button type="submit">Забронювати</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CinemaHall;
