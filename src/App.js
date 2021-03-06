import "./App.css";
import "bulma/css/bulma.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import env from "./env";

const { API_URL, API_KEY } = env;

function App() {
  return (
    <div className="container">
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path={"/pelicula/:id"}
            render={(props) => (
              <MovieDetail
                movieId={props.match.params.id}
                apiUrl={API_URL}
                apiKey={API_KEY}
              />
            )}
          />
          <Route exact path="/favoritos">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
