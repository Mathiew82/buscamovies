import { connect } from 'react-redux';
import { actionsMoviesList } from '@/store/moviesList/actions';
import MoviesList from '../MoviesList';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = actionsMoviesList;

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
