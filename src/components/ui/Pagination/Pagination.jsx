import PropTypes from "prop-types";
import "./Pagination.scss";

function Pagination(props) {
  const { currentPage, paginationLength, clickPage } = props;

  const MAX_PAGES = 500;
  const limitedPaginationLength = Math.min(paginationLength ?? 0, MAX_PAGES);

  const doNotShowFirstPage = () => currentPage === 1 || currentPage === 2;
  const doNotShowPrevPage = () => currentPage === 1;
  const doNotShowNextPage = () => currentPage + 1 > limitedPaginationLength;
  const doNotShowLastPage = () =>
    currentPage === limitedPaginationLength ||
    currentPage === limitedPaginationLength - 1;

  const safeClickPage = (page) => {
    const safePage = Math.max(1, Math.min(page, limitedPaginationLength));
    clickPage(safePage);
  };

  return (
    <nav
      style={{ display: limitedPaginationLength < 2 ? "none" : undefined }}
      className="pagination is-centered"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="pagination-list">
        <li style={{ display: doNotShowFirstPage() ? "none" : undefined }}>
          <button
            type="button"
            className="pagination-link"
            onClick={() => safeClickPage(1)}
          >
            1
          </button>
        </li>

        <li style={{ display: doNotShowFirstPage() ? "none" : undefined }}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>

        <li style={{ display: doNotShowPrevPage() ? "none" : undefined }}>
          <button
            type="button"
            className="pagination-link"
            onClick={() => safeClickPage(currentPage - 1)}
          >
            {currentPage - 1}
          </button>
        </li>

        <li>
          <button
            type="button"
            className="pagination-link is-current"
            aria-current="page"
            onClick={() => safeClickPage(currentPage)}
          >
            {currentPage}
          </button>
        </li>

        <li style={{ display: doNotShowNextPage() ? "none" : undefined }}>
          <button
            type="button"
            className="pagination-link"
            onClick={() => safeClickPage(currentPage + 1)}
          >
            {currentPage + 1}
          </button>
        </li>

        <li style={{ display: doNotShowLastPage() ? "none" : undefined }}>
          <span className="pagination-ellipsis">&hellip;</span>
        </li>

        <li style={{ display: doNotShowLastPage() ? "none" : undefined }}>
          <button
            type="button"
            className="pagination-link"
            onClick={() => safeClickPage(limitedPaginationLength)}
          >
            {limitedPaginationLength}
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
