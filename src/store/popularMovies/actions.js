export const actionsPopularMovies = (dispatch) => {
  return {
    setMovies: (movies) => {
      dispatch({ type: 'SET_POPULAR_MOVIES', payload: { movies } })
    },
    setCurrentPage: (currentPage) => {
      dispatch({ type: 'SET_POPULAR_CURRENT_PAGE', payload: { currentPage } })
    },
    setPaginationLength: (paginationLength) => {
      dispatch({
        type: 'SET_POPULAR_PAGINATION_LENGTH',
        payload: { paginationLength },
      })
    },
  }
}
