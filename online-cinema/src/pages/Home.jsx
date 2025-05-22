
// src/pages/Home.jsx
import React from 'react';
import MovieList from '../components/MovieList.jsx';
import movies from '../data/movies.js';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Онлайн Кінотеатр</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
