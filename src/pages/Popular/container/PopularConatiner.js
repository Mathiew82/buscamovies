import { connect } from 'react-redux'
import { actionsPopularMovies } from '../../../store/popularMovies/actions'
import Popular from '../Popular'

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = actionsPopularMovies

export default connect(mapStateToProps, mapDispatchToProps)(Popular)
