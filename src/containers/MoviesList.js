import { connect } from "react-redux";
import MoviesList from "../components/MoviesList";

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
    inputValue: state.inputValue,
    currentPage: state.currentPage,
    paginationLength: state.paginationLength,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (movies) => {
      dispatch({ type: "SET_MOVIES", payload: { movies } });
    },
    setInputValue: (inputValue) => {
      dispatch({ type: "SET_INPUT_VALUE", payload: { inputValue } });
    },
    setCurrentPage: (currentPage) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: { currentPage } });
    },
    setPaginationLength: (paginationLength) => {
      dispatch({
        type: "SET_PAGINATION_LENGTH",
        payload: { paginationLength },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
