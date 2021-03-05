import React from "react";
import Header from "../components/ui/Header";
import MoviesListContainer from "../containers/MoviesList";

function Home() {
  return (
    <div className="home-page">
      <div className="app">
        <Header />
        <div>
          <MoviesListContainer />
        </div>
      </div>
    </div>
  );
}

export default Home;
