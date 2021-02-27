import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/ui/Title";
import { Pagination } from "./components/ui/Pagination";
import { SearchForm } from "./components/SearchForm";
import { MoviesList } from "./components/MoviesList";
import { useState } from "react";

const apiUrl = "https://api.themoviedb.org/3/search/movie";
const apiKey = "4081eee7cd72cb08acc0d2f49deec1da";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const showResults = (data) => {
    setMovies(data.results);
    setPaginationLength(data.total_pages);
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

        <br />
        <div className="is-flex is-justify-content-center is-fullwidth">
          <SearchForm
            submitResults={showResults}
            updateCurrentPage={updateCurrentPage}
            apiUrl={apiUrl}
            apiKey={apiKey}
            page={currentPage}
          />
        </div>

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
      </div>
    </div>
  );
}

export default App;
