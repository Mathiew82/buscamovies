import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MovieDetail(props) {
  const [movie, setMovie] = useState({});

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

  return (
    <div className="more-detail-page">
      <Link to="/">Volver al listado</Link>
      <p>
        {movie.id} / <br />
        {movie.title}
      </p>
    </div>
  );
}

MovieDetail.propTypes = {
  movieId: PropTypes.string,
  apiUrl: PropTypes.string,
  apiKey: PropTypes.string,
};

export default MovieDetail;
