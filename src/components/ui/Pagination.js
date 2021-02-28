import React, { Component } from "react";

export class Pagination extends Component {
  doNotShowFirstPage() {
    return this.props.currentPage === 1 || this.props.currentPage === 2;
  }

  doNotShowPrevPage() {
    return this.props.currentPage === 1;
  }

  doNotShowNextPage() {
    return this.props.currentPage + 1 > this.props.paginationLength;
  }

  doNotShowLastPage() {
    return (
      this.props.currentPage === this.props.paginationLength ||
      this.props.currentPage === this.props.paginationLength - 1
    );
  }

  render() {
    const { handleClickPage, currentPage, paginationLength } = this.props;

    return (
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list">
          <li style={{ display: this.doNotShowFirstPage() && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={handleClickPage}
            >
              1
            </button>
          </li>
          <li style={{ display: this.doNotShowFirstPage() && "none" }}>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li style={{ display: this.doNotShowPrevPage() && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={handleClickPage}
            >
              {currentPage - 1}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="pagination-link is-current"
              aria-current="page"
              onClick={handleClickPage}
            >
              {currentPage}
            </button>
          </li>
          <li style={{ display: this.doNotShowNextPage() && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={handleClickPage}
            >
              {currentPage + 1}
            </button>
          </li>
          <li style={{ display: this.doNotShowLastPage() && "none" }}>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li style={{ display: this.doNotShowLastPage() && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={handleClickPage}
            >
              {paginationLength}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
