
// src/pages/Booking.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import movies from '../data/movies';
import CinemaHall from '../components/CinemaHall';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === parseInt(id));

  if (!movie) {
    return <div>Фільм не знайдено</div>;
  }

  return (
    <div className="booking-container">
      <h1>Бронювання для "{movie.title}"</h1>
      <p>Сеанс: {movie.date} о {movie.time}</p>
      <CinemaHall />
    </div>
  );
};

export default Booking;
