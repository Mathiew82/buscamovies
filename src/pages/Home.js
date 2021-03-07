import React from "react";
import Header from "../components/ui/Header";
import MoviesListContainer from "../containers/MoviesListContainer";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <MoviesListContainer />
    </div>
  );
}

export default Home;
