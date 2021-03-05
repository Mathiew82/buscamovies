import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";
import Pagination from "../components/ui/Pagination";
import Movie from "./Movie";
import env from "../env";

const { API_URL, API_KEY } = env;

function MoviesList(props) {
  const { movies, setMovies } = props;

  const [loadingResults, setLoadingResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationLength, setPaginationLength] = useState(0);
  const [noMatches, setNoMatches] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const setLoadingFromSearchForm = (value) => {
    setLoadingResults(value);
  };

  const addFavoriteMovies = (results) => {
    let favoriteMovies = JSON.parse(
      window.localStorage.getItem("favoriteMovies")
    );
    if (!favoriteMovies) favoriteMovies = [];

    results.forEach((item) => {
      let currentMovie = favoriteMovies.find((i) => i.id === item.id);
      if (currentMovie) item.isFavorite = true;
    });

    return results;
  };

  const showResults = (data) => {
    const { results, total_pages } = data;

    if (!results) return;
    if (results.length === 0) setNoMatches(true);
    if (results.length > 0) setNoMatches(false);

    const resultsWithFavorites = addFavoriteMovies(results);

    setMovies(resultsWithFavorites);
    setPaginationLength(total_pages);
    scrollToTop();
  };

  const updateCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML);
    setCurrentPage(currentValueButton);
  };

  return (
    <div>
      <Loading loading={loadingResults} />

      <div className="is-flex is-justify-content-center is-fullwidth">
        <SearchForm
          setLoadingFromSearchForm={setLoadingFromSearchForm}
          submitResults={showResults}
          updateCurrentPage={updateCurrentPage}
          apiUrl={API_URL}
          apiKey={API_KEY}
          page={currentPage}
        />
      </div>

      {movies.length > 0 ? (
        <ul className="movies-list">
          {movies.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </ul>
      ) : noMatches ? (
        <div className="no-movie-results">
          No hay películas que coincidan con tu búsqueda
        </div>
      ) : (
        <div className="no-movie-results">
          Utiliza el buscador para buscar películas
        </div>
      )}

      <Pagination
        moviesLength={movies.length}
        currentPage={currentPage}
        paginationLength={paginationLength}
        handleClickPage={handleClickPage}
      />
    </div>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array,
};

export default MoviesList;
