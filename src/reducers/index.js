const INITIAL_STATE = {
  movies: [],
  inputValue: "",
  currentPage: 1,
  paginationLength: 0,
  popularMovies: [],
  popularCurrentPage: 1,
  popularPaginationLength: 0,
};

export function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        ...state,
        movies: action.payload.movies,
      };
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload.inputValue,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    case "SET_PAGINATION_LENGTH":
      return {
        ...state,
        paginationLength: action.payload.paginationLength,
      };
    case "SET_POPULAR_MOVIES":
      return {
        ...state,
        popularMovies: action.payload.movies,
      };
    case "SET_POPULAR_CURRENT_PAGE":
      return {
        ...state,
        popularCurrentPage: action.payload.currentPage,
      };
    case "SET_POPULAR_PAGINATION_LENGTH":
      return {
        ...state,
        popularPaginationLength: action.payload.paginationLength,
      };
    default:
      return state;
  }
}
