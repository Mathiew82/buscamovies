import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Title from "../components/ui/Title";
import Pagination from "../components/ui/Pagination";
import Loading from "../components/Loading";
import SearchForm from "../components/SearchForm";
import MoviesList from "../components/MoviesList";

function Home(props) {
  const { apiUrl, apiKey } = props;

  const [loadingResults, setLoadingResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [paginationLength, setPaginationLength] = useState(0);
  const [noMatches, setNoMatches] = useState(false);

  const setLoadingFromSearchForm = (value) => {
    setLoadingResults(value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
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
    <div className="home-page">
      <Loading loading={loadingResults} />
      <div className="app">
        <header>
          {/* <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="Search Movies App"
            className="logo"
          />
          <nav>
            <ul>
              <li>
                <a href="./">Página principal</a>
              </li>
              <li>
                <a href="./populares">Populares</a>
              </li>
              <li>
                <a href="./favoritos">Mis favoritos</a>
              </li>
            </ul>
          </nav> */}
          {/* <nav
            className="navbar is-fullwidth"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img
                  src={`${process.env.PUBLIC_URL}/logo.png`}
                  alt="Search Movies App"
                  className="logo"
                />
              </a>

              <a
                href="@"
                role="button"
                className="navbar-burger"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbarBasicExample"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
                <Link to={"/"} className="navbar-item">
                  Página principal
                </Link>
                <Link to={"/populares"} className="navbar-item">
                  Populares
                </Link>
                <Link to={"/favoritos"} className="navbar-item">
                  Mis favoritos
                </Link>
              </div>

              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a href="@" className="button is-primary">
                      <strong>Sign up</strong>
                    </a>
                    <a href="@" className="button is-light">
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav> */}
        </header>

        <div className="is-flex is-justify-content-center is-fullwidth">
          <SearchForm
            setLoadingFromSearchForm={setLoadingFromSearchForm}
            submitResults={showResults}
            updateCurrentPage={updateCurrentPage}
            apiUrl={apiUrl}
            apiKey={apiKey}
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

export default Home;
