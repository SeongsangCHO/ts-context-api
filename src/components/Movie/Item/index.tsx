import React from "react";
import styled from "styled-components";
import { IMAGE_URL } from "../../../api";

interface IProps {
  movie: any;
}
// adult: false
// backdrop_path: "/wsztJfJvJW5nXxn5n0DIMzH2TDM.jpg"
// genre_ids: (2) [35, 10749]
// id: 347626
// media_type: "movie"
// original_language: "en"
// original_title: "He's All That"
// overview: "메이크오버 전문으로 잘나가는 10대 인플루언서 패짓. 그녀가 불가능한 작전에 돌입한다. 인기 없는 남학생 하나를 프롬의 왕으로 만드는 것! 10대 영화의 고전 \"쉬즈 올 댓\"의 리메이크다."
// popularity: 129.09
// poster_path: "/kW3AG5NHoyq52dcSbMiFB6LyHvk.jpg"
// release_date: "2021-08-27"
// title: "히즈 올 댓"
// video: false
// vote_average: 6.5
// vote_count: 27 /kdnZgD1PfNQmRKWBAFvCsyNfFG7.jpg

const MovieItem: React.FC<IProps> = ({ movie }) => {
  const handleClick = () => {
    console.log("보고싶은영화로 클릭", movie.id);
  };
  return (
    <Item>
      <img src={IMAGE_URL + movie.poster_path}></img>
      <Info>
        <li>제목 : {movie.title}</li>
        <li>개봉일 : {movie.release_date}</li>
      </Info>
      <AddBookmarkBtn onClick={handleClick}>보고싶어요</AddBookmarkBtn>
    </Item>
  );
};
export default MovieItem;

const Item = styled.li`
  position: relative;
  height: 200px;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  margin: 10px;
`;

const Info = styled.ul`
  list-style: none;
`;

const AddBookmarkBtn = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  width: 75px;
  height: 35px;
`;
