import React, { useContext, createContext, useReducer, Dispatch } from "react";
import { movieReducer } from "./Reducer";

export interface IMovieListData {
  title: string;
  adult: false;
  backdrop_path?: string;
  genre_ids?: [string];
  id?: number;
  media_type?: string;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface IBookmarkListData extends IMovieListData {
  comment: string;
}

export type Action =
  | { type: "ADD_MOVIE_DATA"; payload: IMovieListData }
  | { type: "ADD_WATCHED_DATA"; payload: IBookmarkListData }
  | { type: "DELETE_WATCHED_DATA"; payload: number }
  | { type: "UPDATE_COMMENT_DATA"; payload: IBookmarkListData };

export interface IMovieContext {
  movieData: IMovieListData[];
  watchedList: IBookmarkListData[];
}

export const initState: IMovieContext = {
  movieData: [],
  watchedList: [],
};

interface IProps {
  children: React.ReactNode;
}

type MovieDispatch = Dispatch<Action>;
export const MovieContext = createContext<IMovieContext | null>(null);
export const MovieDispatchContext = createContext<MovieDispatch | null>(null);

const MovieStore: React.FC<IProps> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initState);
  return (
    <MovieContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatch}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieContext.Provider>
  );
};

export function useMovieState() {
  const state = useContext(MovieContext);
  if (!state) throw new Error("TodosProvider not found");
  return state;
}

export function useMovieDispatch() {
  const dispatch = useContext(MovieDispatchContext);
  if (!dispatch) throw new Error("TodosProvider not found");
  return dispatch;
}

export default MovieStore;
