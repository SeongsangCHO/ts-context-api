import { createSlice } from "@reduxjs/toolkit";
import { number } from "yargs";
import { AppDispatch } from "../";
import { getMovieList, BASE_URL, END_POINT } from "../../api";

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
export interface IWatchedListData extends IMovieListData {
  comment: string;
}
interface MovieState {
  movieData: IMovieListData[];
  watchedList: IWatchedListData[];
  page: number;
}

export const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    movieData: [],
    watchedList: [],
    page: 1,
  } as MovieState,
  reducers: {
    addMovieData: (state, { payload: data }) => {
      state.movieData.push(...data);
      state.page += 1;
    },
    addWatchedData: (state, { payload: data }) => {
      state.watchedList.push({ ...data, comment: "" });
    },
    deleteWatchedData: (state, { payload: id }) => {
      state.watchedList = state.watchedList.filter((item) => item.id !== id);
      // return {
      //   ...state,
      //   watchedList: state.watchedList.filter((item) => item.id !== id),
      // };
    },
    updateCommentData: (state, { payload: data }) => {
      const { movie, commentText } = data;

      state.watchedList = state.watchedList.map((item) =>
        item.id === movie.id ? { ...movie, comment: commentText } : item
      );
    },
  },
});
export const {
  addMovieData,
  addWatchedData,
  deleteWatchedData,
  updateCommentData,
} = MovieSlice.actions;

// export const selectMovieData = (state: RootState) => state.movie.movieData;
// export const selectWatchedData = (state: RootState) => state.movie.watchedList; // const watchedList = useSelector(selectWatchedDdata);

export const fetchMovies =
  (isIntersect: boolean, page: number) => async (dispatch: AppDispatch) => {
    if (isIntersect) {
      try {
        const data = await getMovieList(`${BASE_URL}/${END_POINT.trending}`, {
          page: page,
        });
        if (!data) {
          fetchMovies(isIntersect, page + 1);
        } else {
          dispatch(addMovieData(data.results));
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

export default MovieSlice.reducer;
