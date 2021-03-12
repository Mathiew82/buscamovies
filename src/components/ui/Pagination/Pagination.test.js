import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination Component Tests", () => {
  test("Component should render correctly", () => {
    const handleClickPage = () => {};
    const currentPage = 1;
    const paginationLength = 200;

    const { asFragment, unmount } = render(
      <Pagination
        currentPage={currentPage}
        paginationLength={paginationLength}
        handleClickPage={handleClickPage}
      />
    );

    const firstRender = asFragment();
    expect(firstRender).toMatchSnapshot(asFragment());
    unmount();
  });
});
