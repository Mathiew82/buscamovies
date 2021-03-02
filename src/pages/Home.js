import React, { Component } from "react";
import { Title } from "../components/ui/Title";
import { Pagination } from "../components/ui/Pagination";
import { Loading } from "../components/Loading";
import { SearchForm } from "../components/SearchForm";
import { MoviesList } from "../components/MoviesList";

export class Home extends Component {
  state = {
    loadingResults: false,
    currentPage: 1,
    movies: [],
    paginationLength: 0,
    noMatches: false,
  };

  setLoadingFromSearchForm = (value) => {
    this.setState({
      loadingResults: value,
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  addFavoriteMovies = (results) => {
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

  showResults = (data) => {
    const { results, total_pages } = data;

    if (!results) return;
    if (results.length === 0) this.setState({ noMatches: true });
    if (results.length > 0) this.setState({ noMatches: false });

    const resultsWithFavorites = this.addFavoriteMovies(results);

    this.setState({ movies: resultsWithFavorites });
    this.setState({ paginationLength: total_pages });
    this.scrollToTop();
  };

  updateCurrentPage = (value) => {
    this.setState({ currentPage: value });
  };

  handleClickPage = (event) => {
    const currentValueButton = Number(event.target.innerHTML);
    this.setState({ currentPage: currentValueButton });
  };

  render() {
    const { apiUrl, apiKey } = this.props;

    const {
      loadingResults,
      currentPage,
      movies,
      paginationLength,
      noMatches,
    } = this.state;

    const {
      setLoadingFromSearchForm,
      showResults,
      updateCurrentPage,
      handleClickPage,
    } = this;

    return (
      <div className="home-page">
        <Loading loading={loadingResults} />
        <div className="app">
          <header>
            <Title>Search Movies with React</Title>
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
            </nav>
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
}
