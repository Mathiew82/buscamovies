import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";
import Label from "../components/ui/Label";
import useVoteAverage from "../hooks/useVoteAverage";

function MovieDetail(props) {
  const [movie, setMovie] = useState({});

  const formatRevenue = (value) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  useEffect(() => {
    const { movieId, apiUrl, apiKey } = props;
    const url = new URL(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
    url.searchParams.append("language", "es-ES");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      });
  }, [props]);

  const voteAverage = useVoteAverage(movie.vote_average);
  const formattedRevenue = formatRevenue(movie.revenue);

  return (
    <div className="more-detail-page">
      {movie && Object.keys(movie).length > 0 && (
        <div className="row">
          <div className="col xs-12 sm-12 md-4 lg-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="more-detail-page__img"
            />
            <p>
              <span className="more-detail-page-vote-average-value">
                {voteAverage} de 100 de valoración
              </span>
              <progress
                className={`progress ${voteAverage < 15 ? "is-danger" : ""} ${
                  voteAverage >= 15 && voteAverage < 30 ? "is-warning" : ""
                } ${voteAverage >= 30 && voteAverage < 50 ? "is-info" : ""} ${
                  voteAverage >= 50 ? "is-primary" : ""
                }`}
                value={`${voteAverage}`}
                max="100"
              />
              <div className="tac">
                <Label>Votos totales:</Label> {movie.vote_count}
              </div>
            </p>
          </div>
          <div className="col xs-12 sm-12 md-8 lg-8 more-detail-page__info">
            <Title>{movie.title}</Title>
            <Subtitle>{movie.tagline}</Subtitle>
            <p>{movie.overview}</p>
            <p>
              <Label>Fecha de lanzamiento:</Label> {movie.release_date}
            </p>
            <p>
              <Label>Duración:</Label>{" "}
              {movie.runtime === 0
                ? "Sin información"
                : `${movie.runtime} minutos`}
            </p>
            <p>
              <Label>Título original:</Label> {movie.original_title}
            </p>
            <p>
              <Label>Ingresos:</Label>{" "}
              {movie.revenue === 0 ? "Sin información" : formattedRevenue}
            </p>
            <p>
              <Label>Producida en:</Label>
              <ul>
                {movie.production_countries.map((country) => (
                  <li>{country.name}</li>
                ))}
              </ul>
            </p>
            <p>
              <Label>Géneros:</Label>
              <ul>
                {movie.genres.map((genre) => (
                  <li>{genre.name}</li>
                ))}
              </ul>
            </p>
            <p>
              <Label>Compañías de producción:</Label>
              <ul>
                {movie.production_companies.map((company) => (
                  <li>{company.name}</li>
                ))}
              </ul>
            </p>
            <Link className="button is-primary mt-6" to="/">
              Volver al listado
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

MovieDetail.propTypes = {
  movieId: PropTypes.string,
  apiUrl: PropTypes.string,
  apiKey: PropTypes.string,
};

export default MovieDetail;
