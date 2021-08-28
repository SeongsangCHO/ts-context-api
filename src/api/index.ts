export const BASE_URL =
  "http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=f5eef3421c602c6cb7ea224104795888";
export const QUERY_STRING = {
  curPage: "curPage",
  itemPerPage: "itemPerPage",
};

const getMovieList = async (url: string) => {
  try {
    const res = await fetch(url);
    return res;
  } catch (error) {
    console.error(error);
  }
};
