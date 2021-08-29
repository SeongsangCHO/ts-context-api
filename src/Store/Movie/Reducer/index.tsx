import { Action } from "../Actions";

export interface IMovieResponse {
  page?: number;
  results?: IMovieListData[];
  totalPages?: number;
  totalResults?: number;
}

export interface IMovieListData {
  adult?: boolean;
  backdropPath?: string;
  genreIDS?: number[];
  id?: number;
  originalLanguage?: OriginalLanguage;
  originalTitle?: string;
  overview?: string;
  posterPath?: string;
  releaseDate?: Date;
  title?: string;
  video?: boolean;
  voteAverage?: number;
  voteCount?: number;
  popularity?: number;
  mediaType?: MediaType;
}

export enum MediaType {
  Movie = "movie",
}

export enum OriginalLanguage {
  En = "en",
}

// export interface IMovieListData {
//   title: string;
//   adult: false;
//   backdrop_path?: string;
//   genre_ids?: [string];
//   id?: number;
//   media_type?: string;
//   original_language?: string;
//   original_title?: string;
//   overview?: string;
//   popularity?: number;
//   poster_path?: string;
//   release_date?: string;
//   video?: boolean;
//   vote_average?: number;
//   vote_count?: number;
// }

export interface IWatchedListData extends IMovieListData {
  comment: string;
}

export interface IMovieState {
  movieData: IMovieListData[];
  watchedList: IWatchedListData[];
  page: number;
}

export const initState: IMovieState = {
  movieData: [],
  watchedList: [],
  page: 1,
};

const MovieReducer = (state = initState, action: Action): IMovieState => {
  switch (action.type) {
    case "ADD_MOVIE_DATA":
      console.log(state, action);
      return {
        ...state,
        movieData: state.movieData.concat(action.payload),
        page: state.page + 1,
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

export default MovieReducer;
