import { connect } from "react-redux";
import Popular from "../../pages/Popular/Popular";

const mapStateToProps = (state) => {
  return {
    movies: state.popularMovies,
    currentPage: state.popularCurrentPage,
    paginationLength: state.popularPaginationLength,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (movies) => {
      dispatch({ type: "SET_POPULAR_MOVIES", payload: { movies } });
    },
    setCurrentPage: (currentPage) => {
      dispatch({ type: "SET_POPULAR_CURRENT_PAGE", payload: { currentPage } });
    },
    setPaginationLength: (paginationLength) => {
      dispatch({
        type: "SET_POPULAR_PAGINATION_LENGTH",
        payload: { paginationLength },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Popular);
