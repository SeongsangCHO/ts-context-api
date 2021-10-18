import { IMovieListData, IWatchedListData } from "../Reducer";

export type Action =
  | { type: "REQUEST_MOVIE_DATA"; payload: number }
  | { type: "ADD_MOVIE_DATA"; payload: IMovieListData }
  | { type: "ADD_WATCHED_DATA"; payload: IWatchedListData }
  | { type: "DELETE_WATCHED_DATA"; payload: number }
  | { type: "UPDATE_COMMENT_DATA"; payload: IWatchedListData };

 export const requestMovieData = (page: number): Action => {
  return {
    type: "REQUEST_MOVIE_DATA",
    payload: page,
  };
};

export const addMovieData = (data: IMovieListData): Action => {
  return {
    type: "ADD_MOVIE_DATA",
    payload: data,
  };
};

export const addWatchedData = (data: IMovieListData): Action => {
  return {
    type: "ADD_WATCHED_DATA",
    payload: { ...data, comment: "" },
  };
};

export const deleteWatchedData = (id: number): Action => {
  return {
    type: "DELETE_WATCHED_DATA",
    payload: id,
  };
};

export const updateCommentData = (
  data: IMovieListData,
  comment: string
): Action => {
  return {
    type: "UPDATE_COMMENT_DATA",
    payload: { ...data, comment: comment },
  };
};
