
// src/components/MovieCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={`${movie.title} poster`} className="movie-poster" />
      <div className="movie-details">
        <h3>{movie.title}</h3>
        <p><strong>Опис:</strong> {movie.description}</p>
        <p><strong>Жанр:</strong> {movie.genre}</p>
        <p><strong>Сеанс:</strong> {movie.date} о {movie.time}</p>
        <Link to={`/booking/${movie.id}`} className="book-button">
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
