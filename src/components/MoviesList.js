import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm";
import Loading from "../components/Loading";
import Pagination from "../components/ui/Pagination";
import Movie from "./Movie";

function MoviesList(props) {
  const {
    movies,
    setMovies,
    inputValue,
    setInputValue,
    currentPage,
    setCurrentPage,
    paginationLength,
    setPaginationLength,
  } = props;

  const [loadingResults, setLoadingResults] = useState(false);
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

  const handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML);
    setCurrentPage(currentValueButton);
  };

  return (
    <div>
      <Loading loading={loadingResults} />

      <div className="is-flex is-justify-content-center is-fullwidth">
        <SearchForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          setLoadingFromSearchForm={setLoadingFromSearchForm}
          submitResults={showResults}
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
        currentPage={currentPage}
        paginationLength={paginationLength}
        handleClickPage={handleClickPage}
      />
    </div>
  );
}

MoviesList.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  paginationLength: PropTypes.number,
  setPaginationLength: PropTypes.func,
};

export default MoviesList;
