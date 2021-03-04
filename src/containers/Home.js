import { connect } from "react-redux";
import Home from "../pages/Home";

const mapStateToProps = (state) => {
  return {
    movies: state.movies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMovies: (movies) => {
      dispatch({ type: "SET_MOVIES", payload: { movies } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
