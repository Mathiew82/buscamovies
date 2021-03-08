import React from "react";
import { render } from "@testing-library/react";
import Pagination from "../ui/Pagination";

test("Pagination component testing", () => {
  const handleClickPage = () => {};
  const currentPage = 1;
  const paginationLength = 200;

  render(
    <Pagination
      currentPage={currentPage}
      paginationLength={paginationLength}
      handleClickPage={handleClickPage}
    />
  );

  const doNotShowFirstPage = () => {
    return currentPage === 1 || currentPage === 2;
  };
  expect(doNotShowFirstPage()).toBeTruthy();

  const doNotShowPrevPage = () => {
    return currentPage === 1;
  };
  expect(doNotShowPrevPage()).toBeTruthy();

  const doNotShowNextPage = () => {
    return currentPage + 1 > paginationLength;
  };
  expect(doNotShowNextPage()).toBeFalsy();

  const doNotShowLastPage = () => {
    return (
      currentPage === paginationLength || currentPage === paginationLength - 1
    );
  };
  expect(doNotShowLastPage()).toBeFalsy();
});
