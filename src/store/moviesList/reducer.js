import { INITIAL_STATE } from './state'

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      return {
        ...state,
        movies: action.payload.movies,
      }
    case 'SET_INPUT_VALUE':
      return {
        ...state,
        inputValue: action.payload.inputValue,
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload.currentPage,
      }
    case 'SET_PAGINATION_LENGTH':
      return {
        ...state,
        paginationLength: action.payload.paginationLength,
      }
    default:
      return state
  }
}
