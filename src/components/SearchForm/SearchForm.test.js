import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "./SearchForm";

describe("searchform", () => {
  test("component should render correctly", () => {
    let inputValue = "";
    const setInputValue = () => {};
    const handleSubmit = () => {};

    const { queryByTestId, unmount } = render(
      <SearchForm
        inputValue={inputValue}
        setInputValue={setInputValue}
        submit={handleSubmit}
      />
    );

    expect(queryByTestId("search-form")).toBeTruthy();
    unmount();
  });
});
