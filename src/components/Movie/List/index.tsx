import React from "react";
import { useEffect, useRef, useState } from "react";
import { getMovieList, BASE_URL, API_KEY, END_POINT } from "../../../api";
import styled from "styled-components";
import MovieItem from "../Item";
import useIntersectObserver from "../../../hooks/useIntersectObserver";
// `${API_ENDPOINT}/${nextPage}?api_key=${API_KEY}`

interface IProps {}

const mockData = [
  {
    companys: [],
    directors: [],
    genreAlt: "드라마,스릴러",
    movieCd: "20210164",
    movieNm: "박현정 정가",
    movieNmEn: "Advise & Consent",
    nationAlt: "미국",
    openDt: "",
    prdtStatNm: "기타",
    prdtYear: "1962",
    repGenreNm: "드라마",
    repNationNm: "미국",
    typeNm: "장편",
  },
  {
    companys: [],
    directors: [],
    genreAlt: "드라마,스릴러",
    movieCd: "20210164",
    movieNm: "강보현 정가",
    movieNmEn: "Advise & Consent",
    nationAlt: "미국",
    openDt: "",
    prdtStatNm: "기타",
    prdtYear: "1962",
    repGenreNm: "드라마",
    repNationNm: "미국",
    typeNm: "장편",
  },
  {
    companys: [],
    directors: [],
    genreAlt: "드라마,스릴러",
    movieCd: "20210164",
    movieNm: "한우빈 정가",
    movieNmEn: "Advise & Consent",
    nationAlt: "미국",
    openDt: "",
    prdtStatNm: "기타",
    prdtYear: "1962",
    repGenreNm: "드라마",
    repNationNm: "미국",
    typeNm: "장편",
  },
  {
    companys: [],
    directors: [],
    genreAlt: "드라마,스릴러",
    movieCd: "20210164",
    movieNm: "농담곰 정가",
    movieNmEn: "Advise & Consent",
    nationAlt: "미국",
    openDt: "",
    prdtStatNm: "기타",
    prdtYear: "1962",
    repGenreNm: "드라마",
    repNationNm: "미국",
    typeNm: "장편",
  },
];
const MovieList: React.FC<IProps> = ({}) => {
  //pageNum 전역관리
  const [page, setPage] = useState(1);
  const [movieData, setMovieData] = useState<any>([]);
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
          setMovieData([...movieData].concat(...data.results));
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
            <MovieItem movie={data} key={data.id} />
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
