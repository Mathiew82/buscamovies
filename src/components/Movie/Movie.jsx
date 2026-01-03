import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useToggleFavorite from "../../hooks/useToggleFavorite/useToggleFavorite";
import useVoteAverage from "../../hooks/useVoteAverage/useVoteAverage";
import "./Movie.scss";

function Movie(props) {
  const { movie } = props;

  const [loading, setLoading] = useState(false);
  const [imgProcessed, setImgProcessed] = useState(false);

  if (movie.poster_path && !imgProcessed) {
    setImgProcessed(true);
    setLoading(true);

    const img = new Image();
    img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    img.onload = () => {
      setLoading(false);
    };
  }

  const { isAddedToFavorites, addToFavorites, removeToFavorites } =
    useToggleFavorite(movie.id);

  const voteAverage = useVoteAverage(movie.vote_average);

  return (
    <li>
      <span className="icon-wrapper">
        <span
          className="click-zone"
          data-movie={JSON.stringify(movie)}
          onClick={isAddedToFavorites() ? removeToFavorites : addToFavorites}
        />
        {isAddedToFavorites() ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-off-icon lucide-heart-off"
          >
            <path d="M10.5 4.893a5.5 5.5 0 0 1 1.091.931.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 1.872-1.002 3.356-2.187 4.655" />
            <path d="m16.967 16.967-3.459 3.346a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 2.747-4.761" />
            <path d="m2 2 20 20" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
          </svg>
        )}
      </span>
      <Link to={`/pelicula/${movie.id}`}>
        <span
          className="movies-list__img"
          style={{
            backgroundImage: loading
              ? ""
              : movie.poster_path
                ? `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`
                : `url(${import.meta.env.VITE_PUBLIC_URL}/default-movie.png)`,
          }}
        >
          <span
            className="loading is-movie is-grey"
            style={{ display: !loading && "none" }}
          />
          <span className="movies-list-vote-average-value">{voteAverage}</span>
          <span
            className={`rating-ring ${voteAverage < 25 ? "is-danger" : ""} ${
              voteAverage >= 25 && voteAverage < 50 ? "is-warning" : ""
            } ${voteAverage >= 50 && voteAverage < 75 ? "is-info" : ""} ${
              voteAverage >= 75 ? "is-primary" : ""
            }`}
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 40">
              <circle className="ring-bg" cx="20" cy="20" r="16" />
              <circle
                className="ring"
                cx="20"
                cy="20"
                r="16"
                style={{ strokeDashoffset: 100 - voteAverage }}
              />
            </svg>
          </span>
        </span>
        <span className="movies-list__title" title={movie.title}>
          {movie.title}
        </span>
      </Link>
    </li>
  );
}

Movie.propTypes = {
  movie: PropTypes.object,
};

export default Movie;
