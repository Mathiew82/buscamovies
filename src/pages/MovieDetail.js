import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export class MovieDetail extends Component {
  state = {
    movie: {},
  };

  static propTypes = {
    movieId: PropTypes.string,
    apiUrl: PropTypes.string,
    apiKey: PropTypes.string,
  };

  componentDidMount = () => {
    const { movieId, apiUrl, apiKey } = this.props;
    const url = new URL(`${apiUrl}/movie/${movieId}?api_key=${apiKey}`);
    url.searchParams.append("language", "es-ES");

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({
          movie: data,
        });
      })
      .catch((err) => {
        throw new Error(`Error: ${err}`);
      })
      .finally(() => {
        //
      });
  };

  render() {
    return (
      <div className="more-detail-page">
        <Link to="/">Volver al listado</Link>
        <p>
          {this.state.movie.id} / <br />
          {this.state.movie.title}
        </p>
      </div>
    );
  }
}
