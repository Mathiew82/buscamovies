import React, { Component } from "react";

export class Pagination extends Component {
  render() {
    return (
      <nav
        className="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <ul
          style={{ display: this.props.moviesLength === 0 && "none" }}
          className="pagination-list"
        >
          <li style={{ display: this.props.currentPage === 1 && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={this.props.handleClickPage}
            >
              1
            </button>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li style={{ display: this.props.currentPage === 1 && "none" }}>
            <button
              type="button"
              className="pagination-link"
              onClick={this.props.handleClickPage}
            >
              {this.props.currentPage - 1}
            </button>
          </li>
          <li>
            <button
              type="button"
              className="pagination-link is-current"
              aria-current="page"
              onClick={this.props.handleClickPage}
            >
              {this.props.currentPage}
            </button>
          </li>
          <li
            style={{
              display:
                this.props.currentPage + 1 > this.props.paginationLength &&
                "none",
            }}
          >
            <button
              type="button"
              className="pagination-link"
              onClick={this.props.handleClickPage}
            >
              {this.props.currentPage + 1}
            </button>
          </li>
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
          <li
            style={{
              display:
                this.props.currentPage + 1 >= this.props.paginationLength &&
                "none",
            }}
          >
            <button
              type="button"
              className="pagination-link"
              onClick={this.props.handleClickPage}
            >
              {this.props.paginationLength}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
