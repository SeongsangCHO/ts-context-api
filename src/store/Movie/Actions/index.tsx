import { IMovieListData, Action } from "../";

export const set농담곰 = (action: any) => {
  return {
    type: action.type,
    payload: action.paylod,
  };
};

export const addMovieData = (data: IMovieListData[]): Action => {
  return {
    type: "ADD_MOVIE_DATA",
    payload: data,
  };
};

export const addWatchedData = (data: IMovieListData[]): Action => {
  return {
    type: "ADD_WATCHED_DATA",
    payload: data,
  };
};

export const deleteWatchedData = (id: number): Action => {
  return {
    type: "DELETE_WATCHED_DATA",
    payload: id,
  };
};
