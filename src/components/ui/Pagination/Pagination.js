import React from "react";
import PropTypes from "prop-types";

function Pagination(props) {
  const { currentPage, paginationLength, clickPage } = props;

  const doNotShowFirstPage = () => {
    return currentPage === 1 || currentPage === 2;
  };

  const doNotShowPrevPage = () => {
    return currentPage === 1;
  };

  const doNotShowNextPage = () => {
    return currentPage + 1 > paginationLength;
  };

  const doNotShowLastPage = () => {
    return (
      currentPage === paginationLength || currentPage === paginationLength - 1
    );
  };

  return (
    <nav
      style={{ display: paginationLength < 2 && "none" }}
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul data-testid="pagination-list" className="pagination-list">
        <li style={{ display: doNotShowFirstPage() && "none" }}>
          <button type="button" className="pagination-link" onClick={clickPage}>
            1
          </button>
        </li>
        <li style={{ display: doNotShowFirstPage() && "none" }}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li style={{ display: doNotShowPrevPage() && "none" }}>
          <button type="button" className="pagination-link" onClick={clickPage}>
            {currentPage - 1}
          </button>
        </li>
        <li>
          <button
            type="button"
            className="pagination-link is-current"
            aria-current="page"
            onClick={clickPage}
          >
            {currentPage}
          </button>
        </li>
        <li style={{ display: doNotShowNextPage() && "none" }}>
          <button type="button" className="pagination-link" onClick={clickPage}>
            {currentPage + 1}
          </button>
        </li>
        <li style={{ display: doNotShowLastPage() && "none" }}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>
        <li style={{ display: doNotShowLastPage() && "none" }}>
          <button type="button" className="pagination-link" onClick={clickPage}>
            {paginationLength}
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  paginationLength: PropTypes.number,
  clickPage: PropTypes.func,
};

export default Pagination;
