import { combineReducers } from "redux";
import moviesList from "./moviesList/reducer";
import popularMovies from "./popularMovies/reducer";

export default combineReducers({
  moviesList,
  popularMovies,
});
