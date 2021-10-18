import axios from "axios";

import dotenv from "dotenv";
dotenv.config();
export const API_KEY = process.env.REACT_APP_API_KEY;
export const BASE_URL = `https://api.themoviedb.org/3/`;
export const END_POINT = {
  trending: "trending/movie/day",
};
export const PARAMS = {
  language: "ko",
  api_key: API_KEY,
};
// "poster_sizes": [
//   "w92",
//   "w154",
//   "w185",
//   "w342",
//   "w500",
//   "w780",
//   "original"
// ],
export const IMAGE_URL = `https://image.tmdb.org/t/p/w185`;
export const getMovieList = async (url: string, params = {}) => {
  try {
    const res = await axios(url, {
      params: { ...params, language: "ko", api_key: API_KEY },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
