const INITIAL_STATE = {
  movies: [],
};

export function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SET_MOVIES":
      return {
        movies: action.payload.movies,
      };
    default:
      return state;
  }
}
