import React from "react";
import Header from "../../components/ui/Header/Header";
import MoviesListContainer from "../../containers/MoviesListContainer/MoviesListContainer";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <MoviesListContainer />
    </div>
  );
}

export default Home;
