import { all } from "redux-saga/effects";
import movieSaga from "./Movie/Sagas";

function* rootSaga() {
  yield all([movieSaga()]);
}

export default rootSaga;
