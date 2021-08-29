import React, { useContext } from "react";
import { MovieContext, useMovieState } from "../../store/Movie";
import styled from "styled-components";
import MovieItem from "../Movie/Item";
import { v4 as uuidv4 } from "uuid";
import Comment from "./Comment";

interface IProps {}

const WatchedList: React.FC<IProps> = ({}) => {
  const context = useContext(MovieContext);
  const { watchedList } = useMovieState();
  // "comment" <- ""  = add comment = [""->"한줄평을 남겨주세요" | 수정버튼]
  console.log("bookrmark", context);
  return (
    <Wrapper>
      <List>
        {watchedList.length > 0 &&
          watchedList.map((data: any) => (
            <MovieItem movie={data} key={uuidv4()}>
              <Comment movie={data} comment={data.comment} />
            </MovieItem>
          ))}
      </List>
    </Wrapper>
  );
};
export default WatchedList;
const Wrapper = styled.div`
  width: 50%;
  margin: 0 auto;
`;
const NextNoti = styled.div``;
const List = styled.ul`
  border: 1px solid black;
`;
