import React from "react";

function Loading(props) {
  const { loading } = props;

  return (
    <div style={{ display: loading && "block" }} className="loading-wrapper">
      <div className="loading"></div>
    </div>
  );
}

export default Loading;
