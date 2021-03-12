import React from "react";
import { Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import Favorites from "./Favorites";

describe("favorites", () => {
  test("component should render correctly", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Favorites />
      </Router>
    );

    expect(screen.getByText("Mis Favoritos")).toBeInTheDocument();
  });
});
