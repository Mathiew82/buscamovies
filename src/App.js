import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/ui/Title";
import { Pagination } from "./components/ui/Pagination";
import { SearchForm } from "./components/SearchForm";
import { MoviesList } from "./components/MoviesList";
import { useState } from "react";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "4081eee7cd72cb08acc0d2f49deec1da";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0);
  const [noMatches, setNoMatches] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const showResults = (data) => {
    const { results, total_pages } = data;

    if (!results) return;
    if (results.length === 0) setNoMatches(true);
    if (results.length > 0) setNoMatches(false);

    setMovies(results);
    setPaginationLength(total_pages);
    scrollToTop();
  };

  const updateCurrentPage = (value) => {
    setCurrentPage(value);
  };

  const getPopularityInteger = (value) => {
    const valueInteger = parseInt(value);
    return valueInteger > 100 ? 100 : valueInteger;
  };

  const _handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML);
    setCurrentPage(currentValueButton);
  };

  return (
    <div className="container">
      <div className="app">
        <Title>Search Movies with React</Title>

        <div className="is-flex is-justify-content-center is-fullwidth">
          <SearchForm
            submitResults={showResults}
            updateCurrentPage={updateCurrentPage}
            apiUrl={API_URL}
            apiKey={API_KEY}
            page={currentPage}
          />
        </div>

        {movies.length > 0 ? (
          <div>
            <MoviesList
              movies={movies}
              getPopularityInteger={getPopularityInteger}
            />
            <Pagination
              moviesLength={movies.length}
              currentPage={currentPage}
              paginationLength={paginationLength}
              handleClickPage={_handleClickPage}
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
