import React from "react";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "./reducers";
import App from "./App";

const store = createStore(rootReducer);

describe("Components rendering", () => {
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
});
