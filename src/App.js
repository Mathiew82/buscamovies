import "./App.css";
import "bulma/css/bulma.css";
import { Title } from "./components/ui/Title";
import { SearchForm } from "./components/SearchForm";
import { useState } from "react";

function App() {
  const apiKey = "4081eee7cd72cb08acc0d2f49deec1da";
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [pagination, setPagination] = useState([]);

  const showResults = (data) => {
    setMovies(data.results);
    const arrayForPages = Array.from(Array(data.total_pages).keys());
    setPagination(arrayForPages);
  };

  const _handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML);
    setCurrentPage(currentValueButton);
  };

  return (
    <div className="container">
      <div className="app">
        <Title>Search Movies</Title>

        <br />
        <div className="is-flex is-justify-content-center">
          <SearchForm submitResults={showResults} apiKey={apiKey} />
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
                ></span>
                <span className="movies-list__title">{movie.title}</span>
              </li>
            ))}
          </ul>
          <nav
            className="pagination is-centered"
            role="navigation"
            aria-label="pagination"
          >
            <ul className="pagination-list">
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
                  display: currentPage + 1 > pagination.length && "none",
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
                  display: currentPage + 1 >= pagination.length && "none",
                }}
              >
                <button
                  type="button"
                  className="pagination-link"
                  onClick={_handleClickPage}
                >
                  {pagination.length}
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
