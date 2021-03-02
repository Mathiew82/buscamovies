import "./App.css";
import "bulma/css/bulma.css";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "4081eee7cd72cb08acc0d2f49deec1da";

class App extends Component {
  // const url = new URL(document.location);
  // const hasId = url.searchParams.has("id");

  // if (hasId) {
  //   return (
  //     <MovieDetail
  //       id={url.searchParams.get("id")}
  //       apiUrl={API_URL}
  //       apiKey={API_KEY}
  //     />
  //   );
  // }

  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home apiUrl={API_URL} apiKey={API_KEY} />
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
        </Switch>
      </div>
    );
  }
}

export default App;
