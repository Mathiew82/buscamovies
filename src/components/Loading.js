import React, { Component } from "react";

export class Loading extends Component {
  render() {
    const { loading } = this.props;

    return (
      <div style={{ display: loading && "block" }} className="loading-wrapper">
        <div className="loading"></div>
      </div>
    );
  }
}
