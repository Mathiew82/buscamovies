import { combineReducers } from 'redux'
import moviesList from './moviesList'
import popularMovies from './popularMovies'

export default combineReducers({
  moviesList,
  popularMovies,
})
