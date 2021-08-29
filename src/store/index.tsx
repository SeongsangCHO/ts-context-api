import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./Movie";

const store = configureStore({
  reducer: {
    movie: MovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;