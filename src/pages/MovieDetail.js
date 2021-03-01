import React, { Component } from "react";
import PropTypes from "prop-types";

export class MovieDetail extends Component {
  static propTypes = {
    id: PropTypes.number,
  };

  render() {
    return <div>Aquí irán los detalles de la película. = {this.props.id}</div>;
  }
}
