import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/ui/Title";
import { Pagination } from "./components/ui/Pagination";
import { Loading } from "./components/Loading";
import { SearchForm } from "./components/SearchForm";
import { MoviesList } from "./components/MoviesList";
import { useState } from "react";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "4081eee7cd72cb08acc0d2f49deec1da";

function App() {
  const [loadingResults, setLoadingResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
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
    <div className="container">
      <Loading loading={loadingResults} />
      <div className="app">
        <Title>Search Movies with React</Title>

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
          <div>
            <MoviesList movies={movies} />
            <Pagination
              moviesLength={movies.length}
              currentPage={currentPage}
              paginationLength={paginationLength}
              handleClickPage={handleClickPage}
            />
          </div>
        ) : noMatches ? (
          <div className="no-movie-results">
            No hay películas que coincidan con tu búsqueda
          </div>
        ) : (
          <div className="no-movie-results">
            Utiliza el buscador para buscar películas
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
