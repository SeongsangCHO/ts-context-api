import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Action } from "../Actions";
import { IMovieResponse, IMovieListData } from "../Reducer";
import {
  API_KEY,
  BASE_URL,
  END_POINT,
  getMovieList,
  IMAGE_URL,
  PARAMS,
} from "../../../api";
import { createAsyncAction, PayloadAction } from "typesafe-actions";

interface MovieDataRequestPayload {
  // page2: string;
}
const MOVIE_DATA_REQUEST = "REQUEST_MOVIE_DATA";
const ADD_MOVIE_DATA = "ADD_MOVIE_DATA";
const MOVIE_DATA_CANCEL = "MOVIE_DATA_CANCEL";
const movieAsync = createAsyncAction(
  MOVIE_DATA_REQUEST,
  ADD_MOVIE_DATA,
  MOVIE_DATA_CANCEL
)<MovieDataRequestPayload, IMovieListData[], Error>();

// async function 비동기함수(page: number) {
//   const res = await axios(BASE_URL + END_POINT, {
//     params: { ...params, language: "ko", api_key: API_KEY },
//   });
//   const data = await axios(`${BASE_URL}/${END_POINT.trending}`, {
//     page: page,
//   });
//   return res.data;
// }

async function 비동기함수(
  page: MovieDataRequestPayload
): Promise<IMovieListData[]> {
  console.log("왜 됨?", typeof page);

  const res = await axios(`${BASE_URL}/${END_POINT.trending}`, {
    params: { ...PARAMS, page: page },
  });
  return res.data.results;
}
//비동기요청으로 받아오는 데이터 타입을 지정해주는 방법 - CLEAR
//{data:results:[..], url:, status}
//call에서 호출되는 비동기함수에 전달할 파라미터의 타입을 지정해주는 방법
function* 워커함수(action: ReturnType<typeof movieAsync.request>) {
  console.log(action);

  try {
    const res: IMovieListData[] = yield call(비동기함수, action.payload);
    console.log(res);
    yield put(movieAsync.success(res));
    // yield put({ type: "ADD_MOVIE_DATA", payload: res });
  } catch (e) {
    yield put({ type: "실패" });
  }
}

function* movieSaga() {
  yield takeLatest(movieAsync.request, 워커함수);
}

export default movieSaga;
