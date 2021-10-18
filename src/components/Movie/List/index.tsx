import React from "react";
import { useEffect, useRef, useState } from "react";
import { getMovieList, BASE_URL, API_KEY, END_POINT } from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import MovieItem from "../Item";
import useIntersectObserver from "../../../hooks/useIntersectObserver";
import { requestMovieData } from "../../../Store/Movie/Actions";
// `${API_ENDPOINT}/${nextPage}?api_key=${API_KEY}`
import { RootState } from "../../../Store";

import { v4 as uuidv4 } from "uuid";
interface IProps {}

const MovieList: React.FC<IProps> = ({}) => {
  //pageNum 전역관리
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.movie);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState<any>([]);
  const intersectRef = useRef<HTMLDivElement | null>(null);
  const { isIntersect } = useIntersectObserver(intersectRef, {
    rootMargin: "200px",
    thresholds: 0.01,
  });
  const loadMoreMovieData = async () => {
    if (isIntersect) {
      try {
        dispatch(requestMovieData(state.page));
        // const data = await getMovieList(`${BASE_URL}/${END_POINT.trending}`, {
        //   page: page,
        // });
        // if (!data) {
        //   loadMoreMovieData(page + 1);
        // } else {
        //   setMovieData([...movieData].concat(...data.results));
        //   setPage(page + 1);
        // }
      } catch (error) {
        console.error("error");
      }
    }
  };
  useEffect(() => {
    loadMoreMovieData();
  }, [isIntersect]);
  return (
    <Wrapper>
      <List>
        {state.movieData.length > 0 &&
          state.movieData.map((data: any) => (
            <MovieItem movie={data} key={uuidv4()} />
          ))}
      </List>
      <NextNoti ref={intersectRef}>다음보기</NextNoti>
    </Wrapper>
  );
};
export default MovieList;

const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const NextNoti = styled.div``;
const List = styled.ul`
  border: 1px solid black;
`;
