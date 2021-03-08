import React from "react";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import { Provider } from "react-redux";
import { createStore } from "redux";
import { rootReducer } from "../reducers";
import PopularConatiner from "./PopularConatiner";

const store = createStore(rootReducer);

describe("Component rendering", () => {
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
});
