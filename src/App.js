import "./App.css";
import "bulma/css/bulma.css";
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import PopularConatiner from "./containers/PopularConatiner";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <div className="container">
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              path={"/pelicula/:id"}
              render={(props) => (
                <MovieDetail movieId={props.match.params.id} />
              )}
            />
            <Route path="/populares">
              <PopularConatiner />
            </Route>
            <Route path="/favoritos">
              <Favorites />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
