import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/ui/Title";
import { SearchForm } from "./components/SearchForm";
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
          <ul className="movies-list">
            {movies.map((movie) => (
              <li key={movie.id}>
                <span
                  className="movies-list__img"
                  style={{
                    backgroundImage: movie.poster_path
                      ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                      : `url(${process.env.PUBLIC_URL}/default-movie.png)`,
                  }}
                >
                  <span className="movies-list-popularity-value">
                    {getPopularityInteger(movie.popularity)}
                    <small>%</small>
                  </span>
                  <progress
                    className={`progress ${
                      movie.popularity < 15 ? "is-danger" : ""
                    } ${
                      movie.popularity >= 15 && movie.popularity < 30
                        ? "is-warning"
                        : ""
                    } ${
                      movie.popularity >= 30 && movie.popularity < 50
                        ? "is-info"
                        : ""
                    } ${movie.popularity >= 50 ? "is-primary" : ""}`}
                    value={`${getPopularityInteger(movie.popularity)}`}
                    max="100"
                  />
                </span>
                <span className="movies-list__title">{movie.title}</span>
              </li>
            ))}
          </ul>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <ul
              style={{ display: movies.length === 0 && "none" }}
              className="pagination-list"
            >
              <li style={{ display: currentPage === 1 && "none" }}>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={_handleClickPage}
                >
                  1
                </button>
              </li>
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
              <li style={{ display: currentPage === 1 && "none" }}>
                <button
                  type="button"
                  className="pagination-link"
                  onClick={_handleClickPage}
                >
                  {currentPage - 1}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="pagination-link is-current"
                  aria-current="page"
                  onClick={_handleClickPage}
                >
                  {currentPage}
                </button>
              </li>
              <li
                style={{
                  display: currentPage + 1 > paginationLength && "none",
                }}
              >
                <button
                  type="button"
                  className="pagination-link"
                  onClick={_handleClickPage}
                >
                  {currentPage + 1}
                </button>
              </li>
              <li>
                <span className="pagination-ellipsis">&hellip;</span>
              </li>
              <li
                style={{
                  display: currentPage + 1 >= paginationLength && "none",
                }}
              >
                <button
                  type="button"
                  className="pagination-link"
                  onClick={_handleClickPage}
                >
                  {paginationLength}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default App;
