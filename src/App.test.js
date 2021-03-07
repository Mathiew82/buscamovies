import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import App from "./App";
import PopularConatiner from "./containers/PopularConatiner";
import Favorites from "./pages/Favorites";

const store = createStore(rootReducer);

describe("Check render components", () => {
  test("Full app rendering", () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    expect(
      screen.getByText("Utiliza el buscador para buscar películas")
    ).toBeInTheDocument();
  });

  test("Popular component rendering", () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <PopularConatiner />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Las Populares")).toBeInTheDocument();
  });

  test("Favorites component rendering", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Favorites />
      </Router>
    );

    expect(screen.getByText("Mis Favoritos")).toBeInTheDocument();
  });
});
