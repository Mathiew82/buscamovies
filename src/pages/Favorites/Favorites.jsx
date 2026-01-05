import { useState } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Movie from '@/components/Movie/Movie';
import Title from '@/components/ui/Title/Title';

function Favorites() {
  const [movies, setMovies] = useState([]);
  const [favoriteMoviesAdded, setFavoriteMoviesAdded] = useState(false);

  const setFavoriteMovies = () => {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem('favoriteMovies'),
    );
    if (!favoriteMovies) favoriteMovies = [];

    if (movies !== favoriteMovies) setMovies(favoriteMovies);
  };

  if (!favoriteMoviesAdded) {
    setFavoriteMovies();
    setFavoriteMoviesAdded(true);
  }

  return (
    <div className="favorites-page">
      <Header />
      <Title>Mis Favoritas</Title>

      {movies.length > 0 ? (
        <ul className="movies-list">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : (
        <div className="no-movie-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-frown-icon lucide-frown"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
          </svg>
          No tienes películas agregadas a favoritos
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Favorites;
