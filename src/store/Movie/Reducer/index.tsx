import { initState } from "../";
import { Action, IMovieContext } from "../index";

export const movieReducer = (
  state = initState,
  action: Action
): IMovieContext => {
  console.log("reducer", state);

  switch (action.type) {
    case "ADD_MOVIE_DATA":
      return {
        ...state,
        movieData: state.movieData.concat(action.payload),
      };
    case "ADD_WATCHED_DATA":
      return {
        ...state,
        watchedList: state.watchedList.concat(action.payload),
      };
    case "DELETE_WATCHED_DATA":
      return {
        ...state,
        watchedList: state.watchedList.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "UPDATE_COMMENT_DATA":
      return {
        ...state,
        watchedList: state.watchedList.map((item) =>
          item.id === action.payload.id ? { ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};
