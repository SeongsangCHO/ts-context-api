import React from "react";
import { useEffect, useRef, useState } from "react";
import { getMovieList, BASE_URL, END_POINT } from "../../../api";
import styled from "styled-components";
import MovieItem from "../Item";
import useIntersectObserver from "../../../hooks/useIntersectObserver";
import { useMovieDispatch, useMovieState } from "../../../store/Movie";
import { addMovieData } from "../../../store/Movie/Actions";
import { v4 as uuidv4 } from "uuid";

interface IProps {}

const MovieList: React.FC<IProps> = ({}) => {
  const { movieData } = useMovieState();
  const dispatch = useMovieDispatch();
  const [page, setPage] = useState(1);
  const intersectRef = useRef<HTMLDivElement | null>(null);
  const { isIntersect } = useIntersectObserver(intersectRef, {
    rootMargin: "200px",
    thresholds: 0.01,
  });
  const loadMoreMovieData = async (page: number) => {
    if (isIntersect) {
      try {
        const data = await getMovieList(`${BASE_URL}/${END_POINT.trending}`, {
          page: page,
        });
        if (!data) {
          loadMoreMovieData(page + 1);
        } else {
          dispatch(addMovieData(data.results));
          setPage(page + 1);
        }
      } catch (error) {
        console.error("error");
      }
    }
  };
  useEffect(() => {
    loadMoreMovieData(page);
  }, [isIntersect]);
  return (
    <Wrapper>
      <List>
        {movieData.length > 0 &&
          movieData.map((data: any) => (
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
