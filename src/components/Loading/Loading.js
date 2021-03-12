import React from "react";
import PropTypes from "prop-types";

function Loading(props) {
  const { loading } = props;

  return (
    <div style={{ display: loading && "block" }} className="loading-wrapper">
      <div className="loading"></div>
    </div>
  );
}

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
