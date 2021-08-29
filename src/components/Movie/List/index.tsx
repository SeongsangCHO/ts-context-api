import React from "react";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import MovieItem from "../Item";
import useIntersectObserver from "../../../hooks/useIntersectObserver";
import { RootState } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../../../store/Movie";
import { v4 as uuidv4 } from "uuid";

interface IProps {}

const MovieList: React.FC<IProps> = ({}) => {
  const dispatch = useDispatch();
  const { movieData, page } = useSelector((state: RootState) => state.movie);
  const intersectRef = useRef<HTMLDivElement | null>(null);
  const { isIntersect } = useIntersectObserver(intersectRef, {
    rootMargin: "200px",
    thresholds: 0.01,
  });

  useEffect(() => {
    dispatch(fetchMovies(isIntersect, page));
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
