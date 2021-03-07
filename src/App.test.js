import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import App from "./App";

const store = createStore(rootReducer);

/** Example test app rendering and navigate to page */
test("full app rendering and navigate to favorites", () => {
  const history = createMemoryHistory();
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(
    screen.getByText(/Utiliza el buscador para buscar películas/i)
  ).toBeInTheDocument();

  const leftClick = { button: 0 };
  userEvent.click(screen.getByText(/Favoritos/i), leftClick);

  expect(screen.getByText(/Mis Favoritos/i)).toBeInTheDocument();
});

/** Example load and show page */
test("load and show favorites page", () => {
  const history = createMemoryHistory();
  history.push("/favoritos");
  render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  expect(screen.getByText(/Mis Favoritos/i)).toBeInTheDocument();
});
